import { NFTStorage } from 'nft.storage';

// NFT.Stroage
const NFTStorageClient = new NFTStorage({
  token: process.env.NEXT_PUBLIC_NFT_STORAGE_API_KEY ?? 'undefined',
});
// We can fetch storage deal IDs and pinning info from NFT.Storage
// Would be super handy for future when on mainnet for expanded use case
export const fetchNFTStoreStatus = async (ipfsCID: string) => {
  const nftStatus = await NFTStorageClient.status(ipfsCID);
  console.log('nftstatus', nftStatus);
  return nftStatus;
};
