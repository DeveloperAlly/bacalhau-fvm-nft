import { FC, ReactElement, ReactNode } from 'react';
import styled from 'styled-components';

const StyledLayout = styled.div`
  background-color: #ff00ff;
  height: 200px;
  padding: 20px;
`;

type ImagePreviewContainerProps = {
  children?: ReactNode;
};

export const ImagePreviewContainer: FC<ImagePreviewContainerProps> = ({
  children,
}): ReactElement => {
  return <StyledLayout>{children}</StyledLayout>;
};
