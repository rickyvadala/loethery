import {ContractInterface} from "@ethersproject/contracts";

export const abi: ContractInterface = [{
    "inputs": [],
    "stateMutability": "nonpayable",
    "type": "constructor",
}, {
    "inputs": [],
    "name": "enter",
    "outputs": [],
    "stateMutability": "payable",
    "type": "function",
    "payable": true,
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
    "name": "winner",
    "outputs": [{"internalType": "address", "name": "", "type": "address"}],
    "stateMutability": "view",
    "type": "function",
    "constant": true,
}]
