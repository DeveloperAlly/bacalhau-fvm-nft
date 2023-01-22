import { FC, useEffect, useState } from 'react';
import { Button } from '@mui/material';
import { connectWallet } from '@Utils/wallet_helper_functions';
import { Wallet } from '@Utils/interfaces';

type WalletProps = {
  userWallet: Wallet;
  setUserWallet: Function;
};

export const WalletButton: FC<WalletProps> = ({
  userWallet,
  setUserWallet,
  ...rest
}) => {
  const walletStates = {
    connectState: {
      name: 'Connect',
      action: () => connectWallet(setUserWallet),
      background: `-webkit-linear-gradient(left, #60c657 10%, #ad61f5 70%);`,
    },
    connectedState: {
      name: 'Connected',
      action: () => {
        console.log('disconnect wallet here');
      },
      background: `-webkit-linear-gradient(left, #30ccff 10%, #0055ff 70%);`,
    },
    installWalletState: {
      name: 'Install Metamask! 🦊',
      action: () => window.open('https://metamask.io/download.html', '_blank'),
      background: 'grey',
    },
  };
  const [walletState, setWalletState] = useState(walletStates.connectState);

  useEffect(() => {
    const connected = userWallet.accounts && userWallet.accounts.length > 0;
    console.log('useeffect', userWallet);
    if (userWallet && !userWallet.injectedeth) {
      setWalletState(walletStates.installWalletState);
    } else if (userWallet && userWallet.injectedeth && connected) {
      setWalletState(walletStates.connectedState);
    } else {
      setWalletState(walletStates.connectState);
    }
  }, [userWallet]);

  return (
    <Button
      variant="contained"
      onClick={walletState.action}
      sx={{
        background: `${walletState.background}`,
        backgroundSize: '200% 200%',
        animation: `gradient-animation 4s ease infinite`,
        color: 'white',
        fontWeight: 'bold',
        fontSize: 'larger',
        paddingTop: '0.5em',
        paddingRight: '1.5em',
        paddingLeft: '1.5em',
      }}
    >
      {walletState.name}
    </Button>
  );
};
