import {Contract, utils} from "ethers";
import {Web3Provider} from "@ethersproject/providers/src.ts/web3-provider";

export class ContractService {
    contract: Contract;
    provider: Web3Provider;
    account: string;

    constructor(_contract, _provider, _account) {
        this.contract = _contract
        this.provider = _provider
        this.account = _account
    }

    async fetchTicketPrice(): Promise<string> {
        try {
            return utils.formatEther(await this.contract.ticketPrice())
        } catch (e) {
            console.log(e)
            throw new Error(e)
        }
    }

    async fetchWinner() {
        try {
            return await this.contract.winner()
        } catch (e) {
            console.log(e)
            throw new Error(e)
        }
    }

    async fetchManager() {
        try {
            return await this.contract.manager()
        } catch (e) {
            console.log(e)
            throw new Error(e)
        }
    }

    async fetchPlayers() {
        try {
            return await this.contract.getPlayers()
        } catch (e) {
            console.log(e)
            throw new Error(e)
        }
    }

    async fetchLotteryBalance(): Promise<string> {
        try {
            return utils.formatEther(await this.provider.getBalance(this.contract.address))
        } catch (e) {
            console.error('fetchLotteryBalance: ', e)
            throw new Error(e)
        }
    }

    async onPickWinner() {
        try {
            return await this.contract.pickWinner({from: this.account})
        } catch (e) {
            throw new Error(e)
        }
    }

    async onPurchase(value: string) {
        try {
            return await this.contract.purchase({
                from: this.account,
                value: utils.parseUnits(value, 'ether')
            })
        } catch (e) {
            throw new Error(e)
        }
    }
}
