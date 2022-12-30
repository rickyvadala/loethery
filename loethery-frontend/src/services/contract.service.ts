import {ethers} from "ethers";

export type TransactionParams = { from: string, value?: string }
class ContractService {
    async fetchTicketPrice(signedContract): Promise<string> {
        return ethers.utils.formatEther(await signedContract.ticketPrice())
    }
    async fetchWinner(signedContract) {
        return await signedContract.winner()
    }
    async fetchManager(signedContract) {
        return await signedContract.manager()
    }
    async fetchPlayers(signedContract) {
        return await signedContract.getPlayers()
    }
    async fetchLotteryBalance(signedContract, web3Provider): Promise<string> {
        return ethers.utils.formatEther(await web3Provider.getBalance(signedContract.address))
    }
    async onPickWinner(signedContract, params: TransactionParams) {
        return await signedContract.pickWinner(params)
    }
    async onPurchase(signedContract, params: TransactionParams) {
        return await signedContract.purchase(params)
    }
}

export default new ContractService();
