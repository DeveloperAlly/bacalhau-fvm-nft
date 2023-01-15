import { FC, ReactNode } from 'react';
import styled from 'styled-components';

const StyledLayout = styled.div`
  height: auto;
  padding: 20px;
`;

type DappHeaderProps = {
  children?: ReactNode;
};

export const DappHeader: FC<DappHeaderProps> = ({ children }) => {
  return <StyledLayout>{children}</StyledLayout>;
};
