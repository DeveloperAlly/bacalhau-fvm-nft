import { ReactNode } from 'react';
import styled from 'styled-components';
import { ImageLayout } from '@Layouts';
import { Box, Button } from '@mui/material';
const ipfsHttpGatewayLink = `.ipfs.nftstorage.link/`;

//scrollable container for the images (SCROLL NOT WORKING)
// should also auto scale images to page size

const StyledLayout = styled(Box)`
  height: auto;
  width: 100%;
  padding: 20px;
  display: flex;
  flex-flow: wrap;
  justify-content: center;
  overflow: 'hidden';
  overflow-y: 'scroll';
`;

//should take an array prop
interface ImagePreviewContainerProps {
  images: Object[];
  mode?: 'bacalhau' | 'nft';
  children?: ReactNode;
}

/*


*/

export const ImagePreviewContainer = ({
  images,
  mode, //= bacalhau or nfts
  children,
  ...rest
}: ImagePreviewContainerProps) => {
  console.log('images', images);
  return (
    <StyledLayout>
      {images.map((item: any, x: number) => {
        let link, linkArr;
        if (mode === 'bacalhau') {
          link = `https://${item.ipfsCID}${ipfsHttpGatewayLink}`;
        } else {
          linkArr = item.image.split('/');
          link = `https://${linkArr[2]}${ipfsHttpGatewayLink}${linkArr[3]}`;
        }
        return (
          <Box
            key={x}
            sx={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
            }}
          >
            <ImageLayout src={link} alt={item.name} data={item} />
            {children}
          </Box>
        );
      })}
    </StyledLayout>
  );
};
