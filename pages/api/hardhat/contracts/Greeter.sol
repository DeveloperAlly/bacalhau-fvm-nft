// SPDX-License-Identifier: UNLICENSED
//tester
pragma solidity >=0.8.4;

import "../../../../node_modules/hardhat/console.sol";

error GreeterError();

contract Greeter {
    string public greeting;

    constructor(string memory _greeting) {
        console.log("Deploying a Greeter with greeting:", _greeting);
        greeting = _greeting;
    }

    function greet() public view returns (string memory) {
        return greeting;
    }

    function setGreeting(string memory _greeting) public {
        console.log("Changing greeting from '%s' to '%s'", greeting, _greeting);
        greeting = _greeting;
    }

    function throwError() external pure {
        revert GreeterError();
    }
}