// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

// https://docs.openzeppelin.com/contracts/4.x/erc721 
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "hardhat/console.sol"; //alows for console.logs in a solidity contract"

contract BacalhauERC721 is ERC721URIStorage {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;

    uint256 public maxNFTs;
    uint256 public remainingMintableNFTs;

    struct bacalhauERC721NFT {
        address owner;
        string tokenURI;
        uint256 tokenId;
    }

    bacalhauERC721NFT[] public nftCollection;

    event NewBacalhauERC721NFTMinted(
      address indexed sender,
      uint256 indexed tokenId,
      string tokenURI,
      uint256 remainingMintableNFTs
    );

    constructor() ERC721("Bacalhau NFTs", "BAC") {
      console.log("This is my Bacalhau ERC721 NFT contract");
      maxNFTs = 100; //set a limit to number of nft's that are mintable
      remainingMintableNFTs = 100;
    }

    function mintBacalhau(address owner, string memory ipfsURI)
        public
        returns (uint256)
    {
        require(_tokenIds.current() < maxNFTs);
        uint256 newItemId = _tokenIds.current();

        bacalhauERC721NFT memory newNFT = bacalhauERC721NFT({
            owner: msg.sender,
            tokenURI: ipfsURI,
            tokenId: newItemId
        });
    

        _mint(owner, newItemId);
        _setTokenURI(newItemId, ipfsURI);


        _tokenIds.increment();
        // don't like this
        remainingMintableNFTs = maxNFTs - _tokenIds.current();

        nftCollection.push(newNFT);

        emit NewBacalhauERC721NFTMinted(
          msg.sender,
          newItemId,
          ipfsURI,
          remainingMintableNFTs
        );

        return newItemId;
    }

    /**
     * @notice helper function to display NFTs for frontends
     */
    function getNFTCollection() public view returns (bacalhauERC721NFT[] memory) {
        return nftCollection;
    }

    function getRemainingMintableNFTs() public view returns (uint256) {
        return remainingMintableNFTs;
    }
}