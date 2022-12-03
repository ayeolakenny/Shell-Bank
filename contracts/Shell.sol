// SPDX-License-Identifier:MIT
pragma solidity ^0.8.17;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Capped.sol";

// initial supply sent to owner - 70,000,000
// max supply is capped - 100,000,000 (30,000,000 to our minting system)
// make the token burnable
// create a block reward to distribute new supply to miners

contract Shell is ERC20Capped {
    address payable public owner;
    uint256 public blockReward;

    constructor(uint256 cap)
        ERC20("ShellToken", "SHT")
        ERC20Capped(cap * (10**decimals()))
    {
        owner = payable(msg.sender);
        _mint(owner, 5000 * (10**decimals()));
    }

    function setBlockReward(uint256 reward) public onlyOwner {
        blockReward = reward;
    }

    function destroy() public onlyOwner {
        selfdestruct(owner);
    }

    // modifiers
    modifier onlyOwner() {
        require(msg.sender == owner, "Only the owner can call this function");
        _;
    }
}
