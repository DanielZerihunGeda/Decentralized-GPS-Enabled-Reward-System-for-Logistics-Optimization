// sample contract for testing
pragma solidity ^0.8.0;

contract HelloWorld {
    string private greeting;

    // Event emitted when the greeting message is changed
    event GreetingChanged(string newGreeting);

    // Constructor: Initialize the greeting message
    constructor(string memory _initialGreeting) {
        greeting = _initialGreeting;
    }

    // Function to get the current greeting message
    function getGreeting() public view returns (string memory) {
        return greeting;
    }

    // Function to set a new greeting message
    function setGreeting(string memory _newGreeting) public {
        greeting = _newGreeting;
        emit GreetingChanged(_newGreeting);
    }
}
