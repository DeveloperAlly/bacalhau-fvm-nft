import { FC, ReactElement, ReactNode } from 'react';
import styled from 'styled-components';
// import Image from 'next/image';
// import { Images } from '@Assets/images';
import { Typography } from '@mui/material';
// const { src, alt } = Images.logo;

const StyledLayout = styled.div`
  margin: 1rem 1rem 3rem 1rem;
  height: 20rem;
  /* width: fit-content; */
`;

//keep aspect ratio, set fixed height
// const ImageWrapper = styled.img`
//   border: '2px solid white';
//   border-radius: '1em';
//   height: '20rem';
//   width: 'fit-content';
// `;

type ImageLayoutProps = {
  alt: string;
  src: string;
  data?: object;
  children?: ReactNode;
};

//todo; this only displays an image (not any other type of media)
export const ImageLayout: FC<ImageLayoutProps> = ({
  src,
  alt,
  data,
  children,
}) => {
  return (
    <StyledLayout>
      <img
        src={src}
        alt={alt}
        style={{
          border: '3px solid white',
          borderRadius: '1em',
          height: '20rem',
          width: 'fit-content',
          minWidth: '1rem',
        }}
      />
      <Typography style={{ wordWrap: 'break-word' }}>
        Image details, prompt etc
      </Typography>
      {children}
    </StyledLayout>
  );
};
