export const code: string =
`//SPDX-License-Identifier: MIT

pragma solidity ^0.8.9;

contract Lottery {
    address public manager;
    address public winner;
    address payable[] public players;
    uint public ticketPrice;
    bool public purchasable;

    constructor(uint _ticketPrice, bool _purchasable) {
        manager = msg.sender;
        ticketPrice = _ticketPrice;
        purchasable = _purchasable;
    }

    modifier owner() {
        require(msg.sender == manager);
        _;
    }

    function purchase() public payable {
        require(msg.value == ticketPrice && purchasable == true);
        players.push(payable(msg.sender));
    }

    function random() private view returns (uint) {
        return uint(keccak256(abi.encodePacked(block.difficulty, block.timestamp, players)));
    }

    function pickWinner() public owner {
        uint index = random() % players.length;
        players[index].transfer(address(this).balance);
        winner = address(players[index]);
        players = new address payable[](0);
    }

    function setPurchasable(bool _purchasable) public owner {
        purchasable = _purchasable;
    }

    function setTicketPrice(uint _ticketPrice) public owner {
        require(players.length == 0);
        ticketPrice = _ticketPrice;
    }

    function getPlayers() public view returns (address payable[] memory) {
        return players;
    }
}
`
