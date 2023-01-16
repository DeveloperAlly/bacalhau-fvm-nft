declare let window: any;
import { FC, ReactNode, useState, useEffect } from 'react';
import { ethers } from 'ethers';
import { Typography } from '@mui/material';
import {
  Footer,
  HeaderMenu,
  ImageLayout,
  ImagePreviewContainer,
  InputContainer,
  LayoutContainer,
  WebHeader,
} from '@Layouts';
import { DappHeader } from '@Layouts';
import { Logo, Title, SubTitle, PromptInput, WalletButton } from '@Common';
import { INITIAL_WALLET_STATUS, INITIAL_STATUS } from '@Utils/consts';
import { checkForWalletConnection } from '@Utils/wallet_helper_functions';
import GreeterCompiledContract from '@Contracts/Greeter.sol/Greeter.json';
import BacalhauCompiledContract from '@Contracts/BacalhauERC721.sol/BacalhauERC721.json';

type HomePageProps = {
  children?: ReactNode;
};

const HomePage: FC<HomePageProps> = () => {
  // Wallet interactions (state )
  const [userWallet, setUserWallet] = useState(INITIAL_WALLET_STATUS);
  // const { injectedEth, connected, accounts, chainId } = userWallet;

  // Contract interactions (events, calls etc)
  //

  // Bacalhau interactions
  const [bacalhauResults, setBacalhauResults] = useState();

  // NFT.Stroage?

  //Status holders
  const [status, setStatus] = useState(INITIAL_STATUS);

  useEffect(() => {
    console.log('Connecting to user wallet...');
    if (window.ethereum) {
      setUserWallet((prevState: any) => ({ ...prevState, injectedeth: true }));
      checkForWalletConnection(userWallet, setUserWallet);
      connectToContract();
      // setWalletListeners();
      // setContractEventListener();
    }
    // console.log('Connecting to Wallaby RPC server...')
  }, []);

  useEffect(() => {
    console.log('UserWallet changed', userWallet);
  }, [userWallet]);

  const connectToContract = async () =>
    // contractAddress: string,
    // contractABI: any
    {
      /*Once you have a Provider, you have a read-only connection to the blockchain, which you can use to query the current state, fetch historic logs, look up deployed code and so on. */
      // THIS WOULD BE THE READ ONLY PROVIDER IF WALLET NOT CONNECTED
      // const provider = new ethers.providers.JsonRpcProvider(
      //   process.env.NEXT_PUBLIC_RPC_FILECOIN_WALLABY
      // );
      // const signer = new ethers.Wallet(process.env.WALLET_PRIVATE_KEY);
      // const signer = provider.getSigner();
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();

      const balance = await provider.getBalance(
        '0x230115404c551Fcd0B6d447DE1DaD3afca230E07'
      );
      console.log(
        'provider balance',
        ethers.utils.formatUnits(balance, 18),
        'tFIL'
      );
      const contractAddress =
        process.env.NEXT_PUBLIC_BACALHAUERC721_CONTRACT_ADDRESS || 'undefined';

      //READ ONLY
      const greeterContract = new ethers.Contract(
        '0xe33b7EDc04FB535724Dd2631B9a74FC0726dec91',
        GreeterCompiledContract.abi,
        provider
      );
      console.log('greeterContract', greeterContract);
      const bacalhauContract = new ethers.Contract(
        contractAddress,
        BacalhauCompiledContract.abi,
        provider
      );

      //WRITE with wallet signer
      // const connectedGreeterContract = new ethers.Contract(
      //   '0xe33b7EDc04FB535724Dd2631B9a74FC0726dec91',
      //   GreeterCompiledContract.abi,
      //   signer
      // );
      const connectedGreeterContract = greeterContract.connect(signer);
      console.log('connectedGreeterContract', connectedGreeterContract);

      const connectedBacalhauContract = bacalhauContract.connect(signer);
      console.log('connectedBacalhauContract', connectedBacalhauContract);

      //WORKING!
      await greeterContract
        .greet()
        .then(async (res: any) => {
          console.log('Your greeting', res);
        })
        .catch((err: any) => {
          console.log('Greet fetch err', err);
        });

      await bacalhauContract
        .name()
        .then(async (res: any) => {
          console.log('NFT name', res);
        })
        .catch((err: any) => {
          console.log('NFT name fetch err', err);
        });

      const address = await signer.getAddress();
      console.log('signer address', address);
      await connectedBacalhauContract
        .mintBacalhauNFT(
          address,
          'bafybeiczqahmvfkbdzovl7kkg562ws75knyhhmhsracthbgrlzvljff3iq'
        )
        .then((tx: any) => console.log('CALLED FUNCTION', tx))
        .catch((err: any) => {
          console.log('ERROR', err);
        });

      // await connectedGreeterContract
      //   .setGreeting('bonjour, le monde!')
      //   .then((tx: any) => console.log('CALLED FUNCTION', tx))
      //   .catch((err: any) => {
      //     console.log('ERROR', err);
      //   });
      // contractName
      // contractAddress=
      // contractABI=
      // wallabyRPC=
    };

  return (
    <LayoutContainer>
      <>
        <WebHeader />
        <HeaderMenu>
          <>
            <Logo height={50} />
            <WalletButton
              injectedeth={userWallet.injectedeth}
              connected={userWallet.accounts.length > 0}
            />
          </>
        </HeaderMenu>
        <DappHeader>
          <>
            <Logo height={100} />
            <Title />
            <SubTitle />
          </>
        </DappHeader>
        <InputContainer>
          <>
            <Typography>Give a text prompt to make the artwork</Typography>
            <PromptInput></PromptInput>
          </>
        </InputContainer>
        <ImagePreviewContainer>
          <>
            multiple
            <ImageLayout />
          </>
        </ImagePreviewContainer>
        <Footer />
      </>
    </LayoutContainer>
  );
};

export default HomePage;
