import { FC } from 'react';
import Image from 'next/image';
import { Images } from '@Assets/images';
// import styled from 'styled-components';

const { src, alt } = Images.logoHorizontal;

// const StyledImage = styled.img`
//   /* background-color: #00ff22; */
//   height: 200px;
//   padding: 20px;
// `;

//
type LogoProps = {
  height?: number;
  width?: number;
  href?: string;
};

export const Logo: FC<LogoProps> = ({ href, height, width }) => {
  return (
    <a href={href || 'https://docs.bacalhau.org/'} target="_blank">
      <Image src={src} alt={alt} height={height} width={width} />
    </a>
  );
};
