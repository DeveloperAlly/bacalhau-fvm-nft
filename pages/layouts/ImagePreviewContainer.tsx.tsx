import { ReactNode } from 'react';
import { ImageLayout } from '@Layouts';
import { Box } from '@mui/material';
const ipfsHttpGatewayLink = `.ipfs.nftstorage.link/`; //.ipfs.ipfs.joaoleitao.org

//should take an array prop
interface ImagePreviewContainerProps {
  images: Object[];
  mode?: 'bacalhau' | 'nft';
  children?: ReactNode;
}

export const ImagePreviewContainer = ({
  images,
  mode, //= bacalhau or nfts
  children,
  ...rest
}: ImagePreviewContainerProps) => {
  console.log('all images', images);
  return (
    <Box
      sx={{
        height: 'auto',
        width: '100%',
        padding: '20px',
        display: 'flex',
        flexFlow: 'wrap',
        justifyContent: 'center',
        overflow: 'hidden',
        overflowY: 'scroll',
      }}
    >
      {images.map((item: any, x: number) => {
        // console.log('image item', item);
        let link, linkArr;
        if (mode === 'bacalhau' && item.properties) {
          // console.log('parsing bacimage', item);
          // linkArr = item.properties.origins.ipfs.split('/');
          // link = `https://${linkArr[2]}${ipfsHttpGatewayLink}/outputs/image0.png`;
          linkArr = item.properties.origins.ipfs.split('/');
          link = `http://127.0.0.1:8080/ipfs/${linkArr[2]}/outputs/image0.png`;
          // link = item.properties.origins.bacalhauipfs;
          // console.log('baclink', link);
        } else if (item.image) {
          // console.log('parsing image', item);
          // linkArr = item.properties.origins.ipfs.split('/');
          // link = `https://${linkArr[2]}${ipfsHttpGatewayLink}/outputs/image0.png`;
          linkArr = item.image.split('/');
          link = `https://${linkArr[2]}${ipfsHttpGatewayLink}${linkArr[3]}`;
          // console.log('link', link);
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
            {link && <ImageLayout src={link} alt={item.name} data={item} />}
            {children}
          </Box>
        );
      })}
    </Box>
  );
};
