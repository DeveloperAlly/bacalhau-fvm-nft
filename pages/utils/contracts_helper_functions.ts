declare let window: any;
import { ethers } from 'ethers';
import BacalhauCompiledContract from '@Contracts/BacalhauFRC721.sol/BacalhauFRC721.json';
import { CHAIN_DATA, INITIAL_WALLET_STATUS } from '@Utils/consts';
import { ChainData } from '@Utils/interfaces';

const contractAddressHyperspace = '0x826b3aab262C5f0297F61595c6fbAD0655C73021';
// process.env.NEXT_PUBLIC_BACALHAUERC721_CONTRACT_ADDRESS; //'0x126a4cE56624070Ade7cd4DA0Ffe47975F557eAA';
const wallaby = '0x1096440D62659D0e73647046db8b81Ca1593CABc';
const voidSignerAddress = '0xe443A4C016e7e0Cfd7857Ba426b27Dc614725045';

//Destructure for other chain additions
//TODO: Fix me. both return the same thing
export const getContractConnection = async (mode: String) => {
  console.log('Connection to Contract...');
  let rpc = process.env.NEXT_PUBLIC_RPC_FILECOIN_HYPERSPACE;
  let provider, signer, bacalhauContract;
  if (mode === 'read') {
    provider = new ethers.providers.JsonRpcProvider(rpc);
    bacalhauContract = new ethers.Contract(
      contractAddressHyperspace,
      BacalhauCompiledContract.abi,
      provider
    );
  } else if (window.ethereum) {
    provider = new ethers.providers.Web3Provider(window.ethereum);
    const contract = new ethers.Contract(
      contractAddressHyperspace,
      BacalhauCompiledContract.abi,
      provider
    );
    signer = provider.getSigner();
    bacalhauContract = contract.connect(signer);
    console.log('bac contract', bacalhauContract);
  }
  return bacalhauContract;
};

export const fetchContractConnection = async (
  mode: string,
  rpc: string,
  contractAddress: string
) => {
  console.log('Connection to Contract...');
  let provider, contract; //,signer;
  if (mode === 'read') {
    provider = new ethers.providers.JsonRpcProvider(rpc);
    contract = new ethers.Contract(
      contractAddress,
      BacalhauCompiledContract.abi,
      provider
    );
  } else if (window.ethereum) {
    provider = new ethers.providers.Web3Provider(window.ethereum);
    contract = new ethers.Contract(
      contractAddress,
      BacalhauCompiledContract.abi,
      provider
    );
    // signer = provider.getSigner();
    // connectedcontract = contract.connect(signer);
  }
  return contract;
};

//Events never fire.... hmmm
export const setContractEventListeners = async (
  setStatus: Function,
  getDisplayData: Function,
  getNFTByOwner: Function
) => {
  const connectedContract: any = await getContractConnection('read');
  console.log('connectedcontract', connectedContract);
  // THIS NEVER FIRES - fvm events bug?
  connectedContract.on(
    'NewBacalhauFRC721NFTMinted',
    (sender: string, tokenId: number, tokenURI: string) => {
      console.log(
        'NewbacalhauNFTMinted event triggered, data: ',
        sender,
        tokenId,
        tokenURI
      );
      setStatus({ ...INITIAL_WALLET_STATUS, success: 'Minted NFT' });
      () => getDisplayData();
      () => getNFTByOwner();
      console.log('re-fetch data on trigger');
    }
  );
};
