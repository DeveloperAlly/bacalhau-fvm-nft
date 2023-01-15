import { FC, ReactElement } from 'react';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  justify-content: center;
`;

const StyledSubTitle = styled.div`
  /* background: -webkit-linear-gradient(left, #60c657 30%, #35aee2 60%); */
  font-size: 2rem;
  font-weight: bold;
  width: 40%;
  text-align: center;
`;

type SubTitleProps = {
  text?: string;
};

export const SubTitle: FC<SubTitleProps> = ({ text }): ReactElement => {
  return (
    <Container>
      <StyledSubTitle>
        {text ||
          'Text to Image Auto-generating \n Stable Diffusion NFTs with Bacalhau'}
      </StyledSubTitle>
    </Container>
  );
};
