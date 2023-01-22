// See https://hardhat.org/hardhat-runner/docs/config
// Hardhat's config file will always run before any task,
// so you can use it to integrate with other tools, like importing @babel/register.
import '@nomicfoundation/hardhat-toolbox';
import { config as dotenvConfig } from 'dotenv';
import { HardhatUserConfig } from 'hardhat/config';
import { resolve } from 'path';
// import type { NetworkUserConfig } from 'hardhat/types';

//Import our customised tasks
import './pages/api/hardhat/tasks';

const dotenvConfigPath: string = process.env.DOTENV_CONFIG_PATH || './.env';
dotenvConfig({ path: resolve(__dirname, dotenvConfigPath) });

// Ensure that we have all the environment variables we need.
const walletPrivateKey: string | undefined = process.env.WALLET_PRIVATE_KEY;
if (!walletPrivateKey) {
  throw new Error('Please set your Wallet private key in a .env file');
}

// const chains = {
//   filecoin: {mainnet: 314, testnet: 31415, rpc: }
//   'arbitrum-mainnet': 42161,
//   avalanche: 43114,
//   bsc: 56,
//   hardhat: 31337,
//   mainnet: 1,
//   'optimism-mainnet': 10,
//   'polygon-mainnet': 137,
//   'polygon-mumbai': 80001,
//   sepolia: 11155111,
// };

const config: HardhatUserConfig = {
  solidity: '0.8.17',
  defaultNetwork: 'filecoinWallaby',
  networks: {
    hardhat: {},
    filecoinWallaby: {
      url: 'https://wallaby.node.glif.io/rpc/v0',
      chainId: 31415,
      accounts: [process.env.WALLET_PRIVATE_KEY ?? 'undefined'],
      //explorer: https://wallaby.filscan.io/ and starboard
    },
    filecoinHyperspace: {
      url: 'https://api.hyperspace.node.glif.io/rpc/v1', //https://beryx.zondax.ch/
      chainId: 3141,
      accounts: [process.env.WALLET_PRIVATE_KEY ?? 'undefined'],
      //faucet: https://hyperspace.yoga/#faucet
      //info: https://github.com/filecoin-project/testnet-hyperspace,
      //explorer: glif, filfox??
    },
    ethGoerli: {
      url: 'https://eth-goerli.g.alchemy.com/v2/S4Rrp2eHb-xk5dxnNQygNcv-QfPmzTXX',
      chainId: 5,
      accounts: [process.env.WALLET_PRIVATE_KEY ?? 'undefined'],
    },
    // bscTestnet: {
    //   url: process.env.NEXT_PUBLIC_
    //   chainId:
    //   accounts: [],
    // },
    // polygonMumbai: {
    //   url: process.env.NEXT_PUBLIC_
    //   chainId:
    //   accounts: [],
    // },
    // optimismTestnet: {
    //   url: process.env.NEXT_PUBLIC_
    //   chainId:
    //   accounts: [],
    // },
  },
  paths: {
    root: './pages/api/hardhat',
    tests: './pages/api/hardhat/tests', //who names a directory in the singular?!!!
    cache: './pages/api/hardhat/cache',
  },
  etherscan: {
    // Your API key for Etherscan
    // Obtain one at https://etherscan.io/
    apiKey: process.env.ETHERSCAN_API_KEY,
  },
  gasReporter: {
    currency: 'USD',
    enabled: process.env.REPORT_GAS ? true : false,
    excludeContracts: [],
    src: './contracts',
  },
};

export default config;

/*
Networks
    params: {
      url: 'https://wallaby.node.glif.io/rpc/v0',
      chainId: 31415,
      from: '',
      gas: 30000,
      gasPrice: 0,
      gasMultiplier: 1,
      // accounts: [
      //   // WALLET_PRIVATE_KEY,
      //   'acc89e46ec147b3b34c0fd94b1cbce080d04b810385c6f2187e3407060ef7f24',
      // ],
      // for HD wallets
      accounts: {
        mnemonic: 'test test test test test test test test test test test junk',
        path: "m/44'/60'/0'/0",
        initialIndex: 0,
        count: 20,
        passphrase: '',
      },
      httpHeaders: {
        /*use this field to set extra HTTP Headers to be used when 
        making JSON-RPC requests. It accepts a JavaScript object which 
        maps header names to their values. Default value: undefined */
//       },
//       timeout: 10000,
//     },
// */
