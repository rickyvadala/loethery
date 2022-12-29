import {ContractInterface} from "@ethersproject/contracts";

export const abi: ContractInterface = [{
    "inputs": [
        {
            "internalType": "uint256",
            "name": "_ticketPrice",
            "type": "uint256"
        },
        {
            "internalType": "bool",
            "name": "_purchasable",
            "type": "bool"
        }
    ],
    "stateMutability": "nonpayable",
    "type": "constructor",
}, {
    "inputs": [],
    "name": "getPlayers",
    "outputs": [{"internalType": "address payable[]", "name": "", "type": "address[]"}],
    "stateMutability": "view",
    "type": "function",
    "constant": true,
}, {
    "inputs": [],
    "name": "manager",
    "outputs": [{"internalType": "address", "name": "", "type": "address"}],
    "stateMutability": "view",
    "type": "function",
    "constant": true,
}, {
    "inputs": [],
    "name": "pickWinner",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function",
}, {
    "inputs": [{"internalType": "uint256", "name": "", "type": "uint256"}],
    "name": "players",
    "outputs": [{"internalType": "address payable", "name": "", "type": "address"}],
    "stateMutability": "view",
    "type": "function",
    "constant": true,
}, {
    "inputs": [],
    "name": "purchasable",
    "outputs": [{"internalType": "bool", "name": "", "type": "bool"}],
    "stateMutability": "view",
    "type": "function",
    "constant": true,
}, {
    "inputs": [],
    "name": "purchase",
    "outputs": [],
    "stateMutability": "payable",
    "type": "function",
    "payable": true,
}, {
    "inputs": [{"internalType": "bool", "name": "_purchasable", "type": "bool"}],
    "name": "setPurchasable",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function",
}, {
    "inputs": [{"internalType": "uint256", "name": "_ticketPrice", "type": "uint256"}],
    "name": "setTicketPrice",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function",
}, {
    "inputs": [],
    "name": "ticketPrice",
    "outputs": [{"internalType": "uint256", "name": "", "type": "uint256"}],
    "stateMutability": "view",
    "type": "function",
    "constant": true,
}, {
    "inputs": [],
    "name": "winner",
    "outputs": [{"internalType": "address", "name": "", "type": "address"}],
    "stateMutability": "view",
    "type": "function",
    "constant": true,
}]
