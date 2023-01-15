import { ReactElement, ReactNode, FC } from 'react';
import styled from 'styled-components';

const StyledLayout = styled.div`
  background-color: #eeff00;
  height: 200px;
  padding: 20px;
`;

type FooterProps = {
  children?: ReactNode;
};

export const Footer: FC<FooterProps> = ({
  children,
}: FooterProps): ReactElement => {
  return <StyledLayout>{children}</StyledLayout>;
};
