import { relative } from 'path/posix';
import { ReactElement, ReactNode, FC } from 'react';
import styled from 'styled-components';

const StyledLayout = styled.div`
  display: flex;
  height: 200px;
  padding: 20px;
  justify-content: center;
  position: relative;
`;

const StyledMadeBy = styled.div`
  position: absolute;
  bottom: 1em;
  width: 100%;
`;

type FooterProps = {
  children?: ReactNode;
};

export const Footer: FC<FooterProps> = ({
  children,
}: FooterProps): ReactElement => {
  return (
    <StyledLayout>
      {children} <StyledMadeBy>Made by @developerAlly</StyledMadeBy>
    </StyledLayout>
  );
};
