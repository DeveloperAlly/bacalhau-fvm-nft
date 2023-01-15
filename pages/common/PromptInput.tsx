import { FC, ReactElement, useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import styled from 'styled-components';
import { PromptButton } from '@Common';

const StyledPromptInput = styled(Box)`
  /* background: -webkit-linear-gradient(left, #60c657 30%, #35aee2 60%); */
  /* font-size: 2rem;
  font-weight: bold;
  width: 40%;
  text-align: center; */
`;

type PromptInputProps = {
  text?: string;
};

export const PromptInput: FC<PromptInputProps> = ({}): ReactElement => {
  const [formInput, setFormInput] = useState({});

  useEffect(() => {
    console.log('input changed', formInput);
  }, [formInput]);

  return (
    <StyledPromptInput
      component="form"
      sx={{
        display: 'grid',
        rowGap: 3,
      }}
    >
      <div>Add tips for best results box here</div>
      <TextField
        fullWidth
        label="Text Prompt"
        placeholder="A rainbow Bacalhau in the style of a Monet picture working on an Australian Beach"
        id="prompt_input"
        onChange={(e) => setFormInput({ ...formInput, prompt: e.target.value })}
      />
      <TextField label="# Images" id="number_copies" />
      <PromptButton />
    </StyledPromptInput>
  );
};
