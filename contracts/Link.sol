// SPDX-License-Identifier:MIT
pragma solidity ^0.8.17;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract Link is ERC20 {
    constructor() ERC20("Chainlink Token", "LINK") {
        _mint(msg.sender, 5000 * (10**decimals()));
    }
}
