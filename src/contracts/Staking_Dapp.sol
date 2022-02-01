// SPDX-License-Identifier: MIT
pragma solidity = 0.8.11;

import "./Dummy_Token.sol";
import "./Tether_Token.sol";

contract Staking_Dapp {

    string public name = "Staking Dapp";
    address public owner;
    Dummy_Token public dummy_token;
    Tether_Token public tether_token;

    address[] public stakers;
    mapping(address => uint) public stakingBalance;
    mapping(address => bool) public hasstaked;
    mapping(address => bool) public isstaking;

    constructor(Dummy_Token _dummyToken, Tether_Token _tetherToken) public {
        dummy_token = _dummyToken;
        tether_token = _tetherToken;
        owner = msg.sender;
    }

    function stakeTokens(uint _amount) public {
        // check if amount is zero or not
        require(_amount > 0, "Amount can not be zero.");
        // transferred to tether contract address
        tether_token.transferFrom(msg.sender, address(this), _amount);
        // updated staking balance of user
        stakingBalance[msg.sender] = stakingBalance[msg.sender] + _amount;

        // added user to the stakers array
        if (!hasstaked[msg.sender]) {
            stakers.push(msg.sender);
        }

        // updated the status of staking or not
        isstaking[msg.sender] = true;
        hasstaked[msg.sender] = true;
    }

    function unstakeTokens() public {
        // fetched balance of staker into a variable
        uint balance = stakingBalance[msg.sender];
        // check if balance is zero or not
        require(balance > 0, "Staking balance is zero.");

        // we transferred back tether tokens to use
        tether_token.transfer(msg.sender, balance);

        // set the staking balance to 0
        stakingBalance[msg.sender] = 0;

        // updated the staking status
        isstaking[msg.sender] = false;
    }

    function issuedummy() public {
        // check if owner is accessing function or not
        require(msg.sender == owner, "Caller must be the owner for this function");

        // iterate through stakers array used to store addressed of stakers
        for (uint i = 0; i < stakers.length; i++) {
            address recipient = stakers[i];
            // store balance for each staker
            uint balance = stakingBalance[recipient];
            // check if balance is greater to zero or not, if balance greater than zero, transfer dummy tokens
            if (balance > 0) {
                dummy_token.transfer(recipient, balance);
            }
        }
    }
}
