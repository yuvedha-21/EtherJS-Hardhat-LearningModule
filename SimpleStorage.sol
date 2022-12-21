/*
simplpestorage is first compiled by running ==>"yarn solcjs --bin --abi --include-path node_modules/ --base-path . -o . SimpleStorage.sol" command , this will produce to files 
1. contract's binary file 
2. contract's abi file 

instead of typing thid whole command we make changes in package.json 
adding scripts to package
*/
// I'm a comment!
// SPDX-License-Identifier: MIT

pragma solidity 0.8.17;

// pragma solidity ^0.8.0;
// pragma solidity >=0.8.0 <0.9.0;

contract SimpleStorage {
    uint256 favoriteNumber;

    struct People {
        uint256 favoriteNumber;
        string name;
    }
    // uint256[] public anArray;
    People[] public people;

    mapping(string => uint256) public nameToFavoriteNumber;

    function store(uint256 _favoriteNumber) public {
        favoriteNumber = _favoriteNumber;
    }

    function retrieve() public view returns (uint256) {
        return favoriteNumber;
    }

    function addPerson(string memory _name, uint256 _favoriteNumber) public {
        people.push(People(_favoriteNumber, _name));
        nameToFavoriteNumber[_name] = _favoriteNumber;
    }
}
