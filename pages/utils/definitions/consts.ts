import { Status, Wallet, NFTMetadata } from './interfaces';

export const INITIAL_WALLET_STATUS: Wallet = {
  injectedeth: false,
  accounts: [],
  chainId: null,
  message: '',
};

export const INITIAL_LINK_STATE = {
  etherscan: '',
  opensea: '',
  rarible: '',
};

export const INITIAL_TRANSACTION_STATE: Status = {
  loading: '',
  error: '',
  success: '',
  warning: '',
};

export const NFT_METADATA_ATTRIBUTES: NFTMetadata = {
  name: 'Bacalhau NFT 2023',
  description:
    'NFT created for Bacalhau-FVM Workshop 2023 with Stable Diffusion',
  filename: `Bacalhau.json`,
  filetype: 'image/*',
  prompt: '',
  image: '',
  attributes: {},
};

export const CHAIN_DATA = {
  wallaby: {
    displayName: 'Wallaby',
    id: 31415,
    rpc: process.env.NEXT_PUBLIC_RPC_FILECOIN_WALLABY,
    contractAddress: {
      // erc1155: process.env.REACT_APP_GOERLI_CONTRACT_ADDRESS_1155,
      erc721: process.env.NEXT_PUBLIC_BACALHAUFRC721_CONTRACT_ADDRESS,
    },
    blockExplorer: {
      name: 'Starboard',
      url: 'https://fvm.starboard.ventures/contracts/',
    },
  },
  hyperspace: {
    displayName: 'Hyperspace',
    id: 3141,
    rpc: process.env.NEXT_PUBLIC_RPC_FILECOIN_HYPERSPACE,
    contractAddress: {
      // erc1155: process.env.REACT_APP_GOERLI_CONTRACT_ADDRESS_1155,
      erc721: process.env.NEXT_PUBLIC_BACALHAUFRC721_CONTRACT_ADDRESS_HS,
    },
    blockExplorer: {
      name: 'Filscan',
      url: 'https://hyperspace.filscan.io/address/general?address=',
    },
  },
};

export const ipfsHttpGatewayLink: string = `.ipfs.nftstorage.link/`;
export const blockExplorerRoots = {
  wallaby: [
    'https://fvm.starboard.ventures/contracts/',
    'https://wallaby.filscan.io/address/general?address=',
  ],
  hyperspace: [
    'https://fvm.starboard.ventures/contracts/',
    'https://hyperspace.filscan.io/address/general?address=',
    'https://explorer.glif.io/?network=hyperspacenet',
    'https://beryx.zondax.ch/',
    'https://hyperspace.filfox.info/en',
  ],
};

//can I and/or should I do this in hardhat network config
export const CHAIN_MAPPINGS = {
  wallaby: {
    displayName: 'Goerli',
    id: 5,
    rpc: process.env.REACT_APP_GOERLI_RPC_URL,
    contractAddress: {
      erc1155: process.env.REACT_APP_GOERLI_CONTRACT_ADDRESS_1155,
      erc721: process.env.REACT_APP_GOERLI_CONTRACT_ADDRESS,
    },
    blockExplorer: {
      name: 'Etherscan',
      url: 'https://goerli.etherscan.io/tx/',
    },
  },
  // rinkeby: {
  //   chainName: 'rinkeby',
  //   displayName: 'Rinkeby',
  //   id: 42,
  //   chainId: '0x4',
  //   rpc: process.env.REACT_APP_RINKEBY_RPC_URL,
  //   contractAddress: {
  //     erc1155: process.env.REACT_APP_RINKEBY_CONTRACT_ADDRESS_1155,
  //     erc721: process.env.REACT_APP_RINKEBY_CONTRACT_ADDRESS
  //   },
  //   blockExplorer: { name: 'Etherscan', url: 'https://rinkeby.etherscan.io/tx/' }, //{/tx/txHash}
  //   nftMarketplaceLinks: [
  //     { name: 'Opensea', urlBase: 'https://testnets.opensea.io/assets/', tokenIdConnector: '/' }, // {contractAddress/tokenNumber}
  //     {
  //       name: 'Rarible',
  //       urlBase: 'https://rinkeby.rarible.com/token/',
  //       tokenIdConnector: ':',
  //       url: 'https://rinkeby.rarible.com/token/'
  //     } //{contractAddress:tokenNumber}
  //   ]
  // },
  goerli: {
    displayName: 'Goerli',
    id: 5,
    rpc: process.env.REACT_APP_GOERLI_RPC_URL,
    contractAddress: {
      erc1155: process.env.REACT_APP_GOERLI_CONTRACT_ADDRESS_1155,
      erc721: process.env.REACT_APP_GOERLI_CONTRACT_ADDRESS,
    },
    blockExplorer: {
      name: 'Etherscan',
      url: 'https://goerli.etherscan.io/tx/',
    },
    nftMarketplaceLinks: [
      {
        name: 'Opensea',
        urlBase: 'https://testnets.opensea.io/assets/',
        tokenIdConnector: '/',
      }, // {contractAddress/tokenNumber}
      {
        name: 'Rarible',
        urlBase: 'https://goerli.rarible.com/token/',
        tokenIdConnector: ':',
        url: 'https://goerli.rarible.com/token/',
      }, //{contractAddress:tokenNumber}
    ],
  },
  polygon_test: {
    displayName: 'Polygon Testnet',
    chainName: 'mumbai',
    id: 80001,
    chainId: '0x13881',
    rpc: process.env.REACT_APP_POLYGON_TEST_RPC_URL,
    contractAddress: {
      erc1155: process.env.REACT_APP_POLYGON_TEST_CONTRACT_ADDRESS_1155,
      erc721: process.env.REACT_APP_POLYGON_TEST_CONTRACT_ADDRESS,
    },
    blockExplorer: {
      name: 'Polygonscan',
      url: 'https://mumbai.polygonscan.com/',
    },
    nftMarketplaceLinks: [
      {
        name: 'Opensea',
        urlBase: 'https://testnets.opensea.io/assets/mumbai/',
        tokenIdConnector: '/',
      },
      {
        name: 'Rarible',
        url: `https://rinkeby.rarible.com/collection/polygon/`, //0x617230db79462cba59fcc43f92f3b9fe5067b9e1/items
        urlBase: 'https://rinkeby.rarible.com/token/polygon/',
        tokenIdConnector: ':',
      },
    ],
  },
  // bsc_test: {
  //   displayName: 'BSC Testnet',
  //   chainName: 'bsc testnet',
  //   id: 97,
  //   chainId: '0x61',
  //   rpc: process.env.REACT_APP_BSC_TEST_RPC_URL,
  //   contractAddress: {
  //     erc1155: process.env.REACT_APP_BSC_TEST_CONTRACT_ADDRESS_1155,
  //     erc721: process.env.REACT_APP_BSC_TEST_CONTRACT_ADDRESS
  //   },
  //   blockExplorer: { name: 'BSCscan', url: 'https://testnet.bscscan.com/' }, //{/tx/txHash}
  //   nftMarketplaceLinks: [
  //     {
  //       name: 'Opensea',
  //       urlBase: 'https://testnets.opensea.io/assets/bsctestnet/',
  //       tokenIdConnector: '/'
  //     }
  //   ]
  // }
  // avax_test: {
  //   id: '',
  //   rpc: process.env.REACT_APP_AVAX_TEST_RPC_URL,
  //   contractAddress: {
  //     erc1155: process.env.REACT_APP_AVAX_TEST_CONTRACT_ADDRESS_1155,
  //     erc721: process.env.REACT_APP_AVAX_TEST_CONTRACT_ADDRESS
  //   },
  //   blockExplorer: '',
  //   nftMarketplaceLinks: []
  // }
};
