// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

// https://docs.openzeppelin.com/contracts/4.x/erc721 
import "../../../../node_modules/@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "../../../../node_modules/@openzeppelin/contracts/utils/Counters.sol";
import "../../../../node_modules/hardhat/console.sol"; 

contract BacalhauFRC721 is ERC721URIStorage {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;

    // bafkreifkwdhostelielketqzflbyhr4lldbpi5ycz3kclozf4sy6pchbau
    struct bacalhauFRC721NFT {
        address owner;
        string tokenURI;
        uint256 tokenId;
    }

    bacalhauFRC721NFT[] public nftCollection;
    mapping(address => bacalhauFRC721NFT[]) public nftCollectionByOwner;

    event NewBacalhauFRC721NFTMinted(
      address indexed sender,
      uint256 indexed tokenId,
      string tokenURI
    );

    constructor() ERC721("Bacalhau NFTs", "BAC") {
      console.log("This is my Bacalhau FRC721 NFT contract");
    }

    function mintBacalhauNFT(address owner, string memory ipfsURI)
        public
        returns (uint256)
    {
        // require(_tokenIds.current() < maxNFTs);
        uint256 newItemId = _tokenIds.current();

        bacalhauFRC721NFT memory newNFT = bacalhauFRC721NFT({
            owner: msg.sender,
            tokenURI: ipfsURI,
            tokenId: newItemId
        });

        _mint(owner, newItemId);
        _setTokenURI(newItemId, ipfsURI);
        nftCollectionByOwner[owner].push(newNFT);

        _tokenIds.increment();

        nftCollection.push(newNFT);

        emit NewBacalhauFRC721NFTMinted(
          msg.sender,
          newItemId,
          ipfsURI
        );

        return newItemId;
    }

    /**
    */
    function mintMultipleBacalhauNFTs(address owner, string[] memory ipfsMetadata) public returns (uint256[] memory)
    {
        console.log('minting bacalhau nfts');

        //get length of ipfsMetadata array
        uint256 length = ipfsMetadata.length;
        uint256[] memory tokenIdArray = new uint256[](length);

        //loop through calling mintBacalhauNFT for each
        uint j=0;
        for (j = 0; j < length; j ++) {  //for loop example
            tokenIdArray[j] = mintBacalhauNFT(owner, ipfsMetadata[j]);     
        }

        return tokenIdArray;
    }

    /**
     * @notice helper function to display NFTs for frontends
     */
    function getNFTCollection() public view returns (bacalhauFRC721NFT[] memory) {
        return nftCollection;
    }

    /**
     * @notice helper function to fetch NFT's by owner
     */
    function getNFTCollectionByOwner(address owner) public view returns (bacalhauFRC721NFT[] memory){
        return nftCollectionByOwner[owner];
    }
}