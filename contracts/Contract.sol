pragma solidity ^0.4.18;

contract Contract {

    uint8 private num;
    address private owner;

    event LogCode(uint8 indexed eventCode);

    modifier onlyOwner() {
        require(msg.sender == owner);
        _;
    }

    function Contract(uint8 _num) public {
        owner = msg.sender;
        num = _num;
    } 

    function getNum() view public onlyOwner returns (uint8) {
        return num;
    }

    function log(uint8 _code) public {
        LogCode(_code);
    }

}