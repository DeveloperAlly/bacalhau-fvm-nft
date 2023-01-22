//The styled layout component for all pages
import { ReactNode, FC } from 'react';
import styled from 'styled-components';

const StyledLayout = styled.div`
  min-height: 100vh;
  /* background-color: aliceblue; //'#0d1116'; */
  overflow: scroll;
  text-align: center;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  margin: 1rem;
`;

// interface LayoutProps {
//   children?: ReactElement;
// }

type LayoutContainerProps = {
  children?: ReactNode;
};

export const LayoutContainer: FC<LayoutContainerProps> = (props) => {
  return <StyledLayout> {props.children} </StyledLayout>;
};
