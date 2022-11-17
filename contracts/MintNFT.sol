// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "../node_modules/@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "../node_modules/@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";

contract MintNFT is ERC721, ERC721Enumerable {

    string[] public coders;
    mapping(string => bool) _coderExists;

    constructor() ERC721("MintNFT", "CC") {
    }

    function mint(uint _id) public {
        _mint(msg.sender, _id);
    }

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
}
