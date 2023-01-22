import { Typography } from '@mui/material';
import { ReactElement } from 'react';
import { blockExplorerRoots } from './consts';

//this should become one component

const loadingMsg = (msg?: string) => {
  return (
    <Typography variant="h5" sx={{ fontWeight: 'bold' }} gutterBottom>
      {msg ? msg : 'Loading...'}
    </Typography>
  );
};

//data: { hash: any }
const successMintingNFTmsg = (data: any, msg?: string) => {
  return (
    <>
      <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold' }}>
        NFT Minted to FVM
      </Typography>
      <Typography
        variant="h6"
        gutterBottom
        sx={{ fontWeight: 'bold', wordWrap: 'break-word' }}
      >
        Tx Hash: {data.hash}
      </Typography>
      {/* TODO: FIX THIS CONTRACT ADDRESS TO BE GENERIC */}
      <Typography
        variant="h6"
        gutterBottom
        sx={{ fontWeight: 'bold', wordWrap: 'break-word' }}
      >
        Contract Address:{' '}
        {process.env.NEXT_PUBLIC_BACALHAUERC721_CONTRACT_ADDRESS_HS}
      </Typography>
      {/* TODO: TX HASHES are not available on the current block explorers for now 
            - so can only see this transaction by going to the contract  */}
      <Typography
        variant="h6"
        noWrap
        gutterBottom
        sx={{
          fontWeight: 'bold',
          wordWrap: 'break-word',
        }}
      >
        <span>
          See contract on BlockExplorer:{' '}
          <a
            href={`${blockExplorerRoots.hyperspace[0]}${process.env.NEXT_PUBLIC_BACALHAUERC721_CONTRACT_ADDRESS_HS}`}
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: 'lightskyblue' }}
          >
            {`${blockExplorerRoots.hyperspace[0]}${process.env.NEXT_PUBLIC_BACALHAUERC721_CONTRACT_ADDRESS_HS}`}
          </a>
        </span>
      </Typography>
      <Typography
        variant="subtitle2"
        gutterBottom
        sx={{ wordWrap: 'break-word' }}
      >
        Note that the current blockexplorer's don't yet have mapping between eth
        tx's and the filecoin tipset hashes
      </Typography>
    </>
  );
};

const errorMsg = (err: ReactElement | string, msg: string) => {
  return (
    <>
      <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold' }}>
        {msg}
      </Typography>
      <Typography
        variant="h6"
        gutterBottom
        sx={{ fontWeight: 'bold', wordWrap: 'break-word' }}
      >
        {err}
      </Typography>
    </>
  );
};

const genericMsg = (title: string, msg: string) => {
  return (
    <>
      <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold' }}>
        {title}
      </Typography>
      <Typography
        variant="h6"
        gutterBottom
        sx={{ fontWeight: 'bold', wordWrap: 'break-word' }}
      >
        {msg}
      </Typography>
    </>
  );
};

export { loadingMsg, successMintingNFTmsg, errorMsg, genericMsg };
