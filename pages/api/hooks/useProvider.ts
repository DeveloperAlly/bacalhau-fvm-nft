// if ethereum, use this
// else use the server provider (moralis, infura etc)
// & ask them to install a wallet
declare let window: any;
import { useState } from 'react';
import { ethers } from 'ethers';

const chains = {};

// This should connect to the correct chain.
// DEFAULTS TO WALLABY
// need to make this abstract
const useProvider = (chain: number) => {
  const [provider, setProvider] = useState({});
  // use chain to change the chain
  const { ethereum } = window;
  if (ethereum) {
    const prov = new ethers.providers.Web3Provider(ethereum);
    setProvider(prov);
  } else {
    //read only provider
    const prov = new ethers.providers.JsonRpcProvider(
      process.env.NEXT_PUBLIC_RPC_FILECOIN_WALLABY
    );
    setProvider(prov);
    // setProvider(
    //   new ethers.providers.JsonRpcProvider([
    //     process.env.REACT_APP_RINKEBY_RPC_URL || 'undefined',
    //     'rinkeby',
    //   ])
    // );
  }
  return provider;
};

export default useProvider;
