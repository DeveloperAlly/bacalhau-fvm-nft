import { FC, ReactElement, useState, useEffect, ReactNode } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

type PromptInputProps = {
  prompt: string;
  setPrompt: Function;
  children: ReactNode;
  // status: Status;
  // action: Function;
};

export const PromptInput: FC<PromptInputProps> = ({
  prompt,
  setPrompt,
  children,
  ...rest
}): ReactElement => {
  // useEffect(() => {
  //   console.log('input changed', formInput);
  // }, [formInput]);

  return (
    <Box
      component="form"
      sx={{
        display: 'grid',
        rowGap: 3,
      }}
    >
      <TextField
        fullWidth
        label="Text Prompt"
        placeholder="A rainbow Bacalhau in the style of a Monet picture dancing on an Australian Beach"
        id="prompt_input"
        onChange={(e) => setPrompt(e.target.value)}
      />
      {children}
      {/* <TextField
        label="# Images"
        id="number_copies"
        placeholder="Number of images to generate (max 3)"
        onChange={(e) => setFormInput({ ...formInput, number: e.target.value })}
      /> */}
      {/* <PromptButton action={action} disabled={Boolean(status.loading)} /> */}
    </Box>
  );
};
