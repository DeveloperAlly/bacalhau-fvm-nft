import { FC, ReactElement, ReactNode } from 'react';
import styled from 'styled-components';
import { ImageLayout } from '@Layouts';
import { Box } from '@mui/material';

//scrollable container for the images (SCROLL NOT WORKING)
// should also auto scale images to page size

const StyledLayout = styled(Box)`
  height: auto;
  width: 100%;
  padding: 20px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  overflow: 'hidden';
  overflow-y: 'scroll';
`;

//should take an array prop
interface ImagePreviewContainerProps {
  children?: ReactNode;
}

export const ImagePreviewContainer = (props: ImagePreviewContainerProps) => {
  return (
    <StyledLayout>
      <ImageLayout />
      <ImageLayout />
      <ImageLayout />
    </StyledLayout>
  );
};
