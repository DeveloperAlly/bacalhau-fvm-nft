import { FC, ReactElement, ReactNode } from 'react';
import styled from 'styled-components';

const StyledLayout = styled.div`
  background-color: #ff00ff;
  height: 200px;
  padding: 20px;
`;

type ImageLayoutProps = {
  children?: ReactNode;
};

export const ImageLayout: FC<ImageLayoutProps> = ({
  children,
}): ReactElement => {
  return <StyledLayout>{children}</StyledLayout>;
};
