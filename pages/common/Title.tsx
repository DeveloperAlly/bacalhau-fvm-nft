import { FC, ReactElement } from 'react';
import styled from 'styled-components';

const StyledTitle = styled.div`
  background: -webkit-linear-gradient(right, #30ccff 10%, #30ccff, #0055ff 70%);
  font-size: 4rem;
  font-weight: bold;
  background-size: 100%;
  background-clip: text;
  -webkit-background-clip: text;
  -moz-background-clip: text;
  -webkit-text-fill-color: transparent;
  -moz-text-fill-color: transparent;
`;

type TitleProps = {
  text?: string;
};

export const Title: FC<TitleProps> = ({ text }): ReactElement => {
  return <StyledTitle>{text || 'Bacalhau NFTs'}</StyledTitle>;
};
