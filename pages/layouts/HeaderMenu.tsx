import { ReactElement } from 'react';
import styled from 'styled-components';

const StyledLayout = styled.div`
  padding-bottom: 1rem;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  /* position: fixed;
  top: 10;
  width: 100%;
  background-color: black; */
`;

interface HeaderMenuProps {
  children?: ReactElement;
}

export const HeaderMenu = ({ children }: HeaderMenuProps) => {
  return <StyledLayout>{children}</StyledLayout>;
};
