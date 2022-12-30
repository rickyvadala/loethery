import {Contract, utils} from "ethers";
import {Web3Provider} from "@ethersproject/providers/src.ts/web3-provider";

export type TransactionParams = { from: string, value?: string }
export class ContractService {
    contract: Contract;
    provider: Web3Provider;

    constructor(_contract, _provider) {
        this.contract = _contract
        this.provider = _provider
    }

    async fetchTicketPrice(): Promise<string> {
        return utils.formatEther(await this.contract.ticketPrice())
    }

    async fetchWinner() {
        return await this.contract.winner()
    }

    async fetchManager() {
        return await this.contract.manager()
    }

    async fetchPlayers() {
        return await this.contract.getPlayers()
    }

    async fetchLotteryBalance(): Promise<string> {
        return utils.formatEther(await this.provider.getBalance(this.contract.address))
    }

    async onPickWinner(params: TransactionParams) {
        try {
            return await this.contract.pickWinner(params)
        } catch (e) {
            throw new Error(e)
        }
    }

    async onPurchase({from, value}: TransactionParams) {
        return await this.contract.purchase({from, value: utils.parseUnits(value, 'ether')})
    }
}
