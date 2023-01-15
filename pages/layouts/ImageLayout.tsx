import { FC, ReactElement, ReactNode } from 'react';
import styled from 'styled-components';
import Image from 'next/image';
import { Images } from '@Assets/images';
import { Typography } from '@mui/material';
const { src, alt } = Images.logo;

const StyledLayout = styled.div`
  margin: 1rem;
`;

//keep aspect ratio, set fixed height
const ImageWrapper = styled.div`
  border: 2px solid white;
  border-radius: 1em;
  height: 100%;
`;

type ImageLayoutProps = {
  height?: number;
  width?: number;
  // alt: string;
  // src: string;
};

export const ImageLayout: FC<ImageLayoutProps> = ({
  // src,
  // alt,
  height,
  width,
}) => {
  return (
    <StyledLayout>
      <ImageWrapper>
        <Image
          src={src}
          alt={alt}
          height={height || 240}
          width={width}
          priority={true}
          style={{
            borderRadius: '1em',
            height: '100%',
          }}
        />
      </ImageWrapper>
      <Typography>Image details</Typography>
    </StyledLayout>
  );
};
