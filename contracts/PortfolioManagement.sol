// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract PortfolioManager is Ownable {
    struct Investment {
        address token;
        uint256 amount;
        uint256 timestamp;
    }

    mapping(address => Investment[]) public portfolios;

    event InvestmentAdded(address indexed user, address token, uint256 amount, uint256 timestamp);
    
    function addInvestment(address _token, uint256 _amount) external {
        require(_amount > 0, "Investment amount must be greater than zero");
        require(IERC20(_token).transferFrom(msg.sender, address(this), _amount), "Transfer failed");

        portfolios[msg.sender].push(Investment({
            token: _token,
            amount: _amount,
            timestamp: block.timestamp
        }));

        emit InvestmentAdded(msg.sender, _token, _amount, block.timestamp);
    }

    function getPortfolio(address _user) external view returns (Investment[] memory) {
        return portfolios[_user];
    }
}
