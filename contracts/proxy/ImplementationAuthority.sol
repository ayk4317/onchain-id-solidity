// SPDX-License-Identifier: GPL-3.0

pragma solidity 0.8.17;

import "../interface/IImplementationAuthority.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract ImplementationAuthority is IImplementationAuthority, Ownable {

    // the address of implementation of ONCHAINID
    address internal _implementation;

    constructor(address implementation) {
        _implementation = implementation;
        emit UpdatedImplementation(implementation);
    }

    /**
     *  @dev See {IImplementationAuthority-getImplementation}.
     */
    function getImplementation() external override view returns(address) {
        return _implementation;
    }

    /**
     *  @dev See {IImplementationAuthority-updateImplementation}.
     */
    function updateImplementation(address _newImplementation) public override onlyOwner {
        _implementation = _newImplementation;
        emit UpdatedImplementation(_newImplementation);
    }
}


