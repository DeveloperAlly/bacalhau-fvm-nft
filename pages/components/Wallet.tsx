import { FC, useEffect, useState } from 'react';
import styled from 'styled-components';
import { Button } from '@mui/material';
import { ButtonProps } from '@mui/material';
declare let window: any;

/* 3 states
1. connected (with event listening)
2. disconnected (has wallet)
3. no wallet (etherereum injection obj in browser)
*/

/* Actions needed
1. connected
  - check chainId = wallaby (or switch)
  - 

*/

/*
POC - connect wallet call
*/

interface IProps extends ButtonProps {
  connected: boolean;
} // your custom props

const WalletButton = styled(Button)<{
  injectedEth?: boolean;
  connected: boolean;
}>`
  background: ${({ injectedeth, connected }) =>
    injectedeth && connected
      ? `-webkit-linear-gradient(left, #30ccff 10%, #0055ff 70%);`
      : injectedeth
      ? `-webkit-linear-gradient(left, #60c657 10%, #ad61f5 70%);`
      : 'grey'};
  background-size: 200% 200%;
  animation: gradient-animation 4s ease infinite;
  color: white;
  font-weight: bold;
  font-size: larger;
  padding-top: 0.5em;
  padding-right: 1.5em;
  padding-left: 1.5em;
`;

interface ButtonType {
  name: string;
  action: Function;
}

type WalletProps = {
  buttonType: ButtonType;
};

export const Wallet: FC<WalletProps> = () => {
  const [userWallet, setUserWallet] = useState({});
  const [isConnected, setConnected] = useState(false);
  const [hasInjectedEth, setHasInjectedEth] = useState(false);

  useEffect(() => {
    console.log('check wallet connectivity on first page load');
    if (window.ethereum) {
      setHasInjectedEth(true);
      connectWallet();
    }
  }, []);

  const connectWallet = async () => {
    await window.ethereum
      .request({ method: 'eth_requestAccounts' })
      .then((accounts: any) => {
        console.log('Got wallet accounts', accounts);
        setUserWallet({ ...userWallet, accounts });
        setConnected(true);
      })
      .catch((err: Error) => {
        console.log('Error fetching accounts', err);
      });
  };

  return (
    <>
      <WalletButton variant="contained" connected={false} injectedEth={true}>
        {isConnected && hasInjectedEth
          ? 'Connected'
          : hasInjectedEth
          ? 'Connect'
          : 'Install Metamask! 🦊'}
        onClick=
      </WalletButton>
    </>
  );
};
