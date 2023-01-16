import { FC, ReactElement, useState } from 'react';
import LoadingButton from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';
import styled from 'styled-components';
import { Box } from '@mui/material';

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
  padding-top: 0.5em;
`;

type PromptButtonProps = {
  text?: string;
  enabled: boolean;
  action: Function;
};

export const PromptButton: FC<PromptButtonProps> = ({
  enabled,
  action,
}): ReactElement => {
  const [loading, setLoading] = useState(false);
  const handleClick = () => {
    console.log('im clickd', loading);
    setLoading(true);
  };
  return (
    <Box>
      <StyledLoadingButton
        variant="contained"
        size="large"
        endIcon={enabled ? <SendIcon /> : null}
        onClick={() => action()}
        // loading={enabled}
        // loadingPosition="center"
        disabled={!enabled}
      >
        {enabled ? 'Generate Images!' : 'Loading...'}
      </StyledLoadingButton>
    </Box>
  );
};
