import { NFTStorage } from 'nft.storage';

const key = process.env.NEXT_PUBLIC_NFT_STORAGE_API_KEY || 'undefined';
// NFT.Stroage
// We can fetch storage deal IDs and pinning info from NFT.Storage
// Would be super handy for future when on mainnet for expanded use case
export const fetchNFTStoreStatus = async (ipfsCID: string) => {
  if (key !== 'undefined') {
    const NFTStorageClient = new NFTStorage({
      token: key,
    });
    //request options for cors? ratelimit?
    const nftStatus = await NFTStorageClient.status(ipfsCID);
    return nftStatus;
  }
};
