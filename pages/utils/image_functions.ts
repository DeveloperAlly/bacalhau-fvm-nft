// import { ipfsHttpGatewayLink } from '../consts';
const ipfsHttpGatewayLink = `.ipfs.nftstorage.link/`;

export const formatNFTCollectionForDisplay = async (
  nftCollection: Object[],
  setImageLinks: Function
) => {
  await createImageURLsForRetrieval(nftCollection)
    .then((data: any) => {
      setImageLinks(data);
    })
    .catch((err) => {
      console.log('error creating links', err);
    });
};

//would be good to be able to check this
/* Helper function - manipulating the returned CID into a http link using IPFS gateway */
export const createIPFSgatewayLink = (el: any) => {
  const link = el[1].split('/');
  const fetchURL = `https://${link[2]}${ipfsHttpGatewayLink}${link[3]}`;
  return fetchURL;
};

/* 
    Helper function for fetching the Filecoin data through IPFS gateways 
    to display the images in the UI 
    Needs to be a hook with loading state
  */
export const createImageURLsForRetrieval = async (collection: Object[]) => {
  console.log('collection', collection);
  if (!collection || !collection[0]) return;
  // only return the 5 most recent NFT images
  // this collection is fetched on webpage load
  const dataCollection = collection
    .slice()
    .reverse()
    // .slice(0, limit)
    .map((el) => {
      return el;
    });

  const imgURLs = await Promise.all(
    dataCollection.map(async (el) => {
      const ipfsGatewayLink = createIPFSgatewayLink(el);
      const response = await fetch(ipfsGatewayLink);
      const json = await response.json();
      return json;
    })
  );

  console.log('imgURLs2', imgURLs);
  return imgURLs;
};

export const createImageView = (metadata: any) => {
  //   console.log('creating image view', metadata);
  const imgViewArray = metadata.data.image.pathname.split('/');
  const imgViewString = `https://${imgViewArray[2]}${ipfsHttpGatewayLink}${imgViewArray[3]}`;
  return imgViewString;
};
