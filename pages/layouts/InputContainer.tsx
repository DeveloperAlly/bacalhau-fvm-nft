import { FC, ReactNode } from 'react';
import styled from 'styled-components';

const StyledLayout = styled.div`
  /* background-color: #00ff22; */
  height: auto;
  padding: 20px;
`;

type InputContainerProps = {
  children?: ReactNode;
};

export const InputContainer: FC<InputContainerProps> = ({ children }) => {
  return <StyledLayout>{children}</StyledLayout>;
};
