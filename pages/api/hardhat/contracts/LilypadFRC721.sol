// // SPDX-License-Identifier: MIT
// pragma solidity ^0.8.4;

// // https://docs.openzeppelin.com/contracts/4.x/erc721 
// import "../../../../node_modules/@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
// import "../../../../node_modules/@openzeppelin/contracts/utils/Counters.sol";
// import "../../../../node_modules/hardhat/console.sol"; 

// contract LilypadFRC721 is ERC721URIStorage {
//     using Counters for Counters.Counter;
//     Counters.Counter private _tokenIds;

//     struct lilypadFRC721NFT {
//         address owner;
//         string tokenURI;
//         uint256 tokenId;
//     }

//     lilypadFRC721NFT[] public nftCollection;
//     mapping(address => lilypadFRC721NFT[]) public nftCollectionByOwner;

//     event NewLilypadFRC721NFTMinted(
//       address indexed sender,
//       uint256 indexed tokenId,
//       string tokenURI
//     );

//     constructor() ERC721("Lilypad NFTs", "LILY") {
//       console.log("Hello Fil-ders! Now creating Lilypad FRC721 NFT contract!");
//     }

//     function mintLilypadNFT(address owner, string memory ipfsURI)
//         public
//         returns (uint256)
//     {
//         uint256 newItemId = _tokenIds.current();

//         lilypadFRC721NFT memory newNFT = lilypadFRC721NFT({
//             owner: msg.sender,
//             tokenURI: ipfsURI,
//             tokenId: newItemId
//         });

//         _mint(owner, newItemId);
//         _setTokenURI(newItemId, ipfsURI);
//         nftCollectionByOwner[owner].push(newNFT);

//         _tokenIds.increment();

//         nftCollection.push(newNFT);

//         emit NewLilypadFRC721NFTMinted(
//           msg.sender,
//           newItemId,
//           ipfsURI
//         );

//         return newItemId;
//     }

//     /**
//      * @notice helper function to display NFTs for frontends
//      */
//     function getNFTCollection() public view returns (lilypadFRC721NFT[] memory) {
//         return nftCollection;
//     }

//     /**
//      * @notice helper function to fetch NFT's by owner
//      */
//     function getNFTCollectionByOwner(address owner) public view returns (lilypadFRC721NFT[] memory){
//         return nftCollectionByOwner[owner];
//     }
    
//         /**
//     */
//     function mintMultipleLilypaduNFTs(address owner, string[] memory ipfsMetadata) public returns (uint256[] memory)
//     {
//         console.log('minting lilypad nfts');

//         //get length of ipfsMetadata array
//         uint256 length = ipfsMetadata.length;
//         uint256[] memory tokenIdArray = new uint256[](length);

//         //loop through calling mintBacalhauNFT for each
//         uint j=0;
//         for (j = 0; j < length; j ++) {  //for loop example
//             tokenIdArray[j] = mintLilypadNFT(owner, ipfsMetadata[j]);     
//         }

//         return tokenIdArray;
//     }
// }