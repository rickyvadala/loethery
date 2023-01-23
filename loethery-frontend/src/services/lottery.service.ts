import {ethers} from "ethers";
import {Web3Provider} from "@ethersproject/providers/src.ts/web3-provider";

export class LotteryService {
    contract: ethers.Contract;
    provider: Web3Provider;
    account: string;

    constructor(_contract, _provider, _account) {
        this.contract = _contract
        this.provider = _provider
        this.account = _account
    }

    async fetchTicketPrice(): Promise<string> {
        try {
            return ethers.utils.formatEther(await this.contract.ticketPrice())
        } catch (e) {
            throw e
        }
    }

    async fetchPurchasable() {
        try {
            return await this.contract.purchasable()
        } catch (e) {
            throw e
        }
    }

    async fetchWinner() {
        try {
            return await this.contract.winner()
        } catch (e) {
            throw e
        }
    }

    async fetchManager() {
        try {
            return await this.contract.manager()
        } catch (e) {
            throw e
        }
    }

    async fetchPlayers() {
        try {
            return await this.contract.getPlayers()
        } catch (e) {
            throw e
        }
    }

    async fetchLotteryBalance(): Promise<string> {
        try {
            return ethers.utils.formatEther(await this.provider.getBalance(this.contract.address))
        } catch (e) {
            console.error('fetchLotteryBalance: ', e)
            throw e
        }
    }

    async onSetPurchasable(purchasable: boolean) {
        try {
            return await this.contract.setPurchasable(purchasable, {from: this.account})
        } catch (e) {
            throw e
        }
    }

    async onSetTicketPrice(ticketPrice: string) {
        try {
            return await this.contract.setTicketPrice(
                ethers.utils.parseUnits(ticketPrice, 'ether'),
                {from: this.account}
            )
        } catch (e) {
            throw e
        }
    }

    async onPickWinner() {
        try {
            return await this.contract.pickWinner({from: this.account})
        } catch (e) {
            throw e
        }
    }

    async onPurchase(value: string) {
        try {
            return await this.contract.purchase({
                from: this.account,
                value: ethers.utils.parseUnits(value, 'ether')
            })
        } catch (e) {
            throw e
        }
    }
}
