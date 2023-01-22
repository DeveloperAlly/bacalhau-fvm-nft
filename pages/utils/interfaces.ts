import { ReactElement } from 'react';

export interface Status {
  error: ReactElement | string; //reactElement or string
  success: ReactElement | string;
  warning: ReactElement | string;
  loading: ReactElement | string;
}

export interface Wallet {
  injectedeth: boolean;
  accounts: String[];
  chainId: any;
  message: String; //display any information about incorrect chain or locked wallet?
}

export interface BacalhauImage {
  name: string;
  ipfsCID: string;
  prompt: string;
  minted: boolean;
  cidStatus?: object; //NFT.Storage deals and pinning info
}

export interface NFTMetadata {
  name: string;
  description: string;
  filename: string;
  filetype: string;
  image: string; //any; //ipfs image link
  prompt?: string; //bacalhau image generator prompt
  attributes?: object;
}

type addy = {
  erc721: string;
};
type explore = {
  name: string;
  url: string;
};
export interface NetworkData {
  displayName: string;
  id: number;
  rpc: string | undefined;
  contractAddress: addy;
  blockExplorer: explore;
}
export interface ChainData {
  wallaby: NetworkData;
  hyperspace: NetworkData;
}
