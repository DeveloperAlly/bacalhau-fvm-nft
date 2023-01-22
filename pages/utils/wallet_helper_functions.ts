import { CHAIN_MAPPINGS, INITIAL_WALLET_STATUS } from '@Utils/consts';
import { Wallet } from './interfaces';

declare let window: any;

const fetchWalletAccounts = async () => {
  console.log('Fetching wallet accounts...');
  await window.ethereum //use ethers?
    .request({ method: 'eth_requestAccounts' })
    .then((accounts: string[]) => {
      return accounts;
    })
    .catch((error: any) => {
      if (error.code === 4001) {
        // EIP-1193 userRejectedRequest error
        console.log('Please connect to MetaMask.');
      } else {
        console.error(error);
      }
      // return error;
    });
};

const fetchChainId = async () => {
  console.log('Fetching chainId...');
  await window.ethereum
    .request({ method: 'eth_chainId' })
    .then((chainId: string[]) => {
      return chainId;
    })
    .catch((error: any) => {
      if (error.code === 4001) {
        // EIP-1193 userRejectedRequest error
        console.log('Please connect to MetaMask.');
      } else {
        console.error(error);
      }
    });
};

//TODO: fix error handling
export const connectWallet = async (setUserWallet: Function) => {
  console.log('Connecting to wallet...');
  if (window.ethereum) {
    const accounts = await fetchWalletAccounts();
    const chainId = await fetchChainId();
    setUserWallet((prevState: any) => ({
      ...prevState,
      accounts,
      chainId,
    }));
  } else {
    setUserWallet(INITIAL_WALLET_STATUS);
  }
};

export const checkForWalletConnection = async (setUserWallet: Function) => {
  if (window.ethereum) {
    console.log('Checking for Wallet Connection...');
    await window.ethereum
      .request({ method: 'eth_accounts' })
      .then(async (accounts: String[]) => {
        console.log('Connected to wallet...');
        const chainId = await fetchChainId();
        setUserWallet((prevState: any) => ({
          ...prevState,
          accounts,
          chainId,
        }));
        return true;
      })
      .catch((err: Error) => {
        console.log('Error fetching wallet', err);
        return false;
      });
  } else {
    setUserWallet(INITIAL_WALLET_STATUS);
    return false;
  }
};

export const setWalletListeners = (
  userWallet: Wallet,
  setUserWallet: Function
) => {
  console.log('Setting up wallet event listeners...');
  if (window.ethereum) {
    // subscribe to provider events compatible with EIP-1193 standard.
    window.ethereum.on('accountsChanged', (accounts: any) => {
      console.log('wallet: accounts', accounts);
      //logic to check if disconnected accounts[] is empty
      if (accounts.length < 1) {
        //handle the locked wallet case
      }
      if (userWallet.accounts[0] !== accounts[0]) {
        //clear the ownedNFTs
      }
      setUserWallet((prevState: Wallet) => ({
        ...prevState,
        accounts,
      }));
    });

    // Subscribe to chainId change
    window.ethereum.on('chainChanged', (chainId: any) => {
      console.log('wallet: chainId', chainId);
      if (chainId === null) {
        //handle the locked wallet case
      }
      setUserWallet((prevState: Wallet) => ({
        ...prevState,
        chainId,
      }));
    });
  }
};

//not a lot of point in this function - could do it on the fly.
export const isChainIdCorrect = async (
  userWallet: Wallet,
  correctChainId: string
) => {
  console.log(`Checking wallet chain matches ${correctChainId}...`);
  // const hyperspaceChainId = ethers.utils.hexlify(3141); //hex of 3141
  if (userWallet.chainId !== correctChainId) {
    console.log('wrong chain');
    return false;
    //display a popup to change wallet?
  }
  return true;
};

export const changeWalletChain = async (newChainId: string) => {
  console.log('Changing wallet chain...');
  const provider = window.ethereum;
  try {
    await provider.request({
      method: 'wallet_switchEthereumChain',
      params: [{ chainId: newChainId }], //newChainId
    });
  } catch (error: any) {
    alert(error.message);
  }
};

//AddHyperspaceChain
export const addHyperspaceNetwork = async () => {
  console.log('Adding the Hyperspace Network to Wallet...');
  if (window.ethereum) {
    window.ethereum
      .request({
        method: 'wallet_addEthereumChain',
        params: [
          {
            chainId: '0xc45',
            rpcUrls: [
              'https://hyperspace.filfox.info/rpc/v0',
              'https://filecoin-hyperspace.chainstacklabs.com/rpc/v0',
            ],
            chainName: 'Filecoin Hyperspace',
            nativeCurrency: {
              name: 'tFIL',
              symbol: 'tFIL',
              decimals: 18,
            },
            blockExplorerUrls: [
              'https://fvm.starboard.ventures/contracts/',
              'https://hyperspace.filscan.io/',
              'https://beryx.zondax.chfor',
            ],
          },
        ],
      })
      .then((res: XMLHttpRequestResponseType) => {
        console.log('added hyperspace successfully', res);
      })
      .catch((err: ErrorEvent) => {
        console.log('Error adding hyperspace network', err);
      });
  }
};

// Filecoin - Calibration testnet
// chainId: 314159
// https://calibration.filscan.io

type WalletNetwork = {
  chainId: String; //the hex number
  rpcUrls: String[];
  chainName: String;
  nativeCurrency: {
    name: String;
    symbol: String;
    decimals: number;
  };
  blockExplorerUrls?: String[];
};
export const addWalletNetwork = async (params: WalletNetwork) => {
  if (window.ethereum) {
    window.ethereum.request({
      method: 'wallet_addEthereumChain',
      params: [
        {
          chainId: params.chainId,
          rpcUrls: params.rpcUrls,
          chainName: params.chainName,
          nativeCurrency: params.nativeCurrency,
          blockExplorerUrls: params.blockExplorerUrls || [],
        },
      ],
    });
  }
};
