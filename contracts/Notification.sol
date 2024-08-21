// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Notification {
    event PortfolioChange(address indexed user, string message);

    function notify(address _user, string calldata _message) external {
        // Implement access control and notification logic
        emit PortfolioChange(_user, _message);
    }
}
