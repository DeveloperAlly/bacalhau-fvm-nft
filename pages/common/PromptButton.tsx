import { FC, ReactElement, useState } from 'react';
import LoadingButton from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';
import styled from 'styled-components';
import { Box } from '@mui/material';

const StyledLoadingButton = styled(LoadingButton)`
  /* background-color: #0055ff; */
  background: -webkit-linear-gradient(left, #30ccff 10%, #0055ff 70%);
  color: white;
  font-weight: bold;
  font-size: larger;
  padding-top: 0.5em;
`;

type PromptButtonProps = {
  text?: string;
  handleClick?: Function;
};

export const PromptButton: FC<PromptButtonProps> = ({}): ReactElement => {
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
        endIcon={<SendIcon />}
        onClick={handleClick}
      >
        Generate Images!
      </StyledLoadingButton>
    </Box>
  );
};
