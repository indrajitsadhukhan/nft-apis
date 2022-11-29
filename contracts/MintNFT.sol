// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "../node_modules/@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "../node_modules/@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "../node_modules/@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";

contract MintNFT is ERC721, ERC721Enumerable,ERC721URIStorage {
    uint256 count;
    constructor() ERC721("AA", "A") {
        count=0;
    }

    function mint(string memory _tokenURI)  public returns(uint256) {
        uint256 newItemId=count;
        _mint(msg.sender, newItemId);
        _setTokenURI(newItemId,_tokenURI);
        count++;
        return newItemId;
    }


//Overriding inherited functions 
function _beforeTokenTransfer(address from, address to, uint256 tokenId,uint256 batchSize)
        internal override(ERC721, ERC721Enumerable)
    {
        super._beforeTokenTransfer(from, to, tokenId,batchSize);
    }


    function supportsInterface(bytes4 interfaceId) public view
        override(ERC721, ERC721Enumerable)
        returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }
        function _burn(uint256 tokenId) internal virtual override (ERC721,ERC721URIStorage) {
        super._burn(tokenId);
    }
       function tokenURI(uint256 tokenId)
        public
        view
        override(ERC721, ERC721URIStorage)
        returns (string memory)
    {
        return super.tokenURI(tokenId);
    }
}
