// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract EducationSupport {
    struct EducationalContent {
        string title;
        string content;
    }

    EducationalContent[] public contents;

    function addContent(string calldata _title, string calldata _content) external {
        // Add access control as needed
        contents.push(EducationalContent({
            title: _title,
            content: _content
        }));
    }

    function getContents() external view returns (EducationalContent[] memory) {
        return contents;
    }
}
