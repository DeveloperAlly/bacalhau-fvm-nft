import { FC } from 'react';
import { Box, Typography, Icon, IconButton } from '@mui/material';
import { INITIAL_TRANSACTION_STATE } from '@Utils/definitions/consts';
import { Status } from '@Utils/definitions/interfaces';
// import { Status } from '@Models/';

type StatusDisplayProps = {
  status: Status; //ugh all these should be in models
  setStatus: Function;
};

export const StatusDisplay: FC<StatusDisplayProps> = ({
  status: { error, success, warning },
  setStatus,
  ...rest
}) => {
  return (
    <Box
      sx={{
        width: '80%',
        alignSelf: 'center',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '8rem',
        padding: '0.5rem 1rem 2rem 1rem',
        border: error
          ? '4px solid #f44336'
          : success
          ? '4px solid #66bb6a'
          : '4px solid #ffa726',
        borderRadius: '1em',
      }}
    >
      <Box
        sx={{
          width: '100%',
          height: '1.5rem',
          display: 'flex',
          justifyContent: 'flex-end',
        }}
      >
        <IconButton
          aria-label="close dialog"
          sx={{ padding: 0, margin: 0 }}
          onClick={() => setStatus(INITIAL_TRANSACTION_STATE)}
        >
          <Icon>close</Icon>
        </IconButton>
      </Box>
      <Box
        sx={{
          width: '100%',
          display: 'flex',
          flexWrap: 'wrap',
        }}
      >
        <Box
          sx={{
            width: '10%',
            boxSizing: 'border-box',
          }}
        >
          <Icon
            color={error ? 'error' : success ? 'success' : 'warning'}
            // sx={{ transform: 'scale(200%)' }}
            style={{ fontSize: 60 }}
          >
            {error
              ? 'error'
              : success
              ? 'check_circle'
              : 'warning_amber_rounded'}
          </Icon>
        </Box>
        <Box
          sx={{
            width: '87.5%',
            boxSizing: 'border-box',
            fontSize: 20,
            paddingRight: '0.5rem',
          }}
        >
          {error ? error : success ? success : warning}
        </Box>
      </Box>
    </Box>
  );
};
