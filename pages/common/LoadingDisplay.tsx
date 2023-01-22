import { FC } from 'react';
import {
  // Modal,
  // Backdrop,
  Box,
  CircularProgress,
  Typography,
} from '@mui/material'; //could be good here
import { Status } from '@Utils/interfaces';

type LoadingDisplayProps = {
  status: Status;
  setStatus: Function;
};

export const LoadingDisplay: FC<LoadingDisplayProps> = ({
  status,
  setStatus,
  ...rest
}) => {
  const flag = typeof status.loading;

  return (
    <Box
      component="div"
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '2rem',
      }}
    >
      <CircularProgress
        sx={{
          color: '#30ccff',
          marginBottom: '1rem',
        }}
        size={100}
      />
      {flag === 'string' ? (
        <Typography fontSize={40}>{status.loading}</Typography>
      ) : (
        status.loading
      )}
    </Box>
  );
};
