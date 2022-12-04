pragma solidity ^0.8.7;
// SPDX-License-Identifier: MIT

import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract Bank {
    using Counters for Counters.Counter;
    Counters.Counter private _currentPositionId;

    address owner;
    string[] whitelistedSymbols; //[SHIB, MATIC]

    struct Position {
        uint positionId;
        string symbol;
        uint256 amount;
        uint256 percentagePerAnnum;
        address walletAddress;
        uint createdDate;
        uint expire;
        bool open;
    }

    mapping(string => address) public whitelistedTokens; // [{SHIB: 0x...1, MATIC: 0x..2 }]
    mapping(address => mapping(string => uint256)) public balances; // [0x...3: [{SHIB: 10, MATIC: 10}]]
    mapping(uint256 => Position) public positions; // [0x...3: [{SHIB: 10}]]
    mapping(address => uint[]) public positionIdsByAddress;

    // Events
    event DepositToken(string _symbol, uint _amount);
    event WithdrawToken(string _symbol, uint _amount);
    event StakeToken(
        uint _positionId,
        string _symbol,
        uint256 _amount,
        uint256 _percentagePerAnnum,
        address _walletAddress,
        uint _createdDate,
        uint _expire,
        bool _open
    );

    string[] public tokenSymbols;

    constructor() payable {
        owner = msg.sender;
    }

    receive() external payable {
        balances[msg.sender]["Matic"] += msg.value;
        emit DepositToken("Matic", msg.value);
    }

    function withdrawMatic(uint amount) public {
        require(balances[msg.sender]["Matic"] >= amount, "Insufficient funds");
        balances[msg.sender]["Matic"] -= amount;
        (bool success, ) = payable(msg.sender).call{value: amount}("");
        require(success);
        emit WithdrawToken("Matic", amount);
    }

    function depositTokens(uint256 amount, string memory symbol) external {
        balances[msg.sender][symbol] += amount;
        IERC20(whitelistedTokens[symbol]).transferFrom(
            msg.sender,
            address(this),
            amount
        );
        emit DepositToken(symbol, amount);
    }

    function withdrawTokens(uint256 amount, string memory symbol) external {
        require(balances[msg.sender][symbol] >= amount, "Insufficient funds");
        balances[msg.sender][symbol] -= amount;
        IERC20(whitelistedTokens[symbol]).transfer(msg.sender, amount);
        emit WithdrawToken(symbol, amount);
    }

    function whitelistTokens(
        string memory symbol,
        address tokenAddress
    ) external onlyOwner {
        whitelistedSymbols.push(symbol);
        whitelistedTokens[symbol] = tokenAddress;
    }

    function getWhitelistedSymbols() external view returns (string[] memory) {
        return whitelistedSymbols;
    }

    function getWhitelistedTokenAddress(
        string memory symbol
    ) external view returns (address) {
        return whitelistedTokens[symbol];
    }

    function getTokenBalance(
        string memory symbol
    ) external view returns (uint256) {
        return balances[msg.sender][symbol];
    }

    function stakeToken(
        string memory symbol,
        uint tokenAmount,
        uint percentagePerAnnum,
        uint expires,
        bool fromBalance
    ) external {
        // Make sure the token has been whitelisted
        require(
            whitelistedTokens[symbol] != address(0),
            "cannot stake this token"
        );

        if (fromBalance) {
            balances[msg.sender][symbol] -= tokenAmount;
        } else {
            IERC20(whitelistedTokens[symbol]).transferFrom(
                msg.sender,
                address(this),
                tokenAmount
            );
        }

        positions[_currentPositionId.current()] = Position(
            _currentPositionId.current(),
            symbol,
            tokenAmount,
            percentagePerAnnum,
            msg.sender,
            block.timestamp,
            expires,
            true
        );

        uint interest = calculateInterest(tokenAmount, percentagePerAnnum, 1);

        // IERC20(whitelistedTokens["Shell"]).transfer(msg.sender, interest);
        balances[msg.sender]["Shell"] += interest;

        positionIdsByAddress[msg.sender].push(_currentPositionId.current());

        emit StakeToken(
            _currentPositionId.current(),
            symbol,
            tokenAmount,
            percentagePerAnnum,
            msg.sender,
            block.timestamp,
            expires,
            true
        );

        _currentPositionId.increment();
    }

    function withdrawStakedToken(uint positionId) external {
        require(
            positions[positionId].walletAddress == msg.sender,
            "Not the owner of this position"
        );
        require(positions[positionId].open == true, "Position already closed");
        require(
            block.timestamp > positions[positionId].expire,
            "Position not mature yet"
        );

        positions[positionId].open = false;

        balances[msg.sender][positions[positionId].symbol] += positions[
            positionId
        ].amount;
    }

    function getPositionIdsForAddress() external view returns (uint[] memory) {
        return positionIdsByAddress[msg.sender];
    }

    function getPositionById(
        uint positionId
    ) external view returns (Position memory) {
        return positions[positionId];
    }

    function calculateInterest(
        uint principal,
        uint rate,
        uint time
    ) public pure returns (uint) {
        return (principal * rate * time) / 100;
    }

    modifier onlyOwner() {
        require(owner == msg.sender, "Only owner may call this function");
        _;
    }
}
