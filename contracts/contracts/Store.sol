// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/access/Ownable.sol";

contract Store is Ownable {
    string public cvHash;

    function setCVHash(string memory _hash) public onlyOwner {
        cvHash = _hash;
    }
}
