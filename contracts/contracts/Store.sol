// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/access/Ownable.sol";

contract Store is Ownable {
    string public cvHash;

    constructor() Ownable(msg.sender) {}

    function setCVHash(string memory _hash) public onlyOwner {
        cvHash = _hash;
    }
}
