import { FC, ReactElement, useState } from 'react';
import LoadingButton from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';
import styled from 'styled-components';
import { Box } from '@mui/material';

//need to pass in var for mint/generate options

//pass in prop here
const StyledLoadingButton = styled(LoadingButton)`
  /* background-color: #0055ff; */
  background: ${(props) =>
    props.disabled
      ? 'grey'
      : `-webkit-linear-gradient(left, #30ccff 10%, #0055ff 70%)`};
  color: white;
  font-weight: bold;
  font-size: larger;
  padding-top: '0.5em';
`;

type PromptButtonProps = {
  disabled: boolean;
  action: Function;
  text?: string;
};

export const PromptButton: FC<PromptButtonProps> = ({
  text,
  disabled,
  action,
}): ReactElement => {
  return (
    <Box>
      <StyledLoadingButton
        variant="contained"
        size="large"
        endIcon={
          disabled ? null : (
            <SendIcon style={{ fontSize: 30, marginLeft: '0.5rem' }} />
          )
        }
        onClick={() => action()}
        // loading={enabled}
        // loadingPosition="center"
        disabled={disabled}
      >
        {text ? text : ' Generate Images!'}
      </StyledLoadingButton>
    </Box>
  );
};
