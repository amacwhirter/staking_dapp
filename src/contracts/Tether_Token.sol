// SPDX-License-Identifier: MIT
pragma solidity = 0.8.11;

contract Tether_Token {

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

    function transfer(address _to, uint256 _value) public returns(bool success) {
        require(balance[msg.sender] <= _value);
        balance[msg.sender] -= _value;
        balance[_to] += _value;
        emit Transfer(msg.sender, _to, _value);
        return true;
    }

    function approve(address _spender, uint256 _value) public returns(bool success) {
        allowance[msg.sender][_spender] = _value;
        emit Approve(msg.sender, _spender, _value);
        return true;
    }

    function transferfrom(address _from, address _to, uint256 _value) public returns(bool success) {
        require(_value <= balance[_from]);
        require(_value <= allowance[_from][msg.sender]);
        balance[_from] -= _value;
        balance[_to] += _value;
        allowance[_from][msg.sender] -= _value;
        emit Transfer(_from, _to, _value);
        return true;
    }
}
