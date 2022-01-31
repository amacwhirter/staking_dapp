// SPDX-License-Identifier: MIT
pragma solidity <=0.4.22 <0.9.0;

contract Tether {

    string public name = "dummy Tether token";
    string public symbol = "Tether";
    uint public totalsupply = 1000000000000000000000000;
    uint public decimal = 18;

    event Transfer(
        address indexed _from,
        address indexed _to,
        uint _value
    );

    event Approve(
        address indexed _owner,
        address indexed _spender,
        uint _value
    );

    mapping(address => uint256) public balance;
    mapping(address => mapping(address => uint256)) public allowance;

    constructor() public {
        balance[msg.sender] = totalsupply;
    }

    function transfer() public returns(bool) {

    }
}
