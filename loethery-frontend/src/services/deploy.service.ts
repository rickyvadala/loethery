import {ethers} from "ethers";
import {abi, evm} from "../utils/constants/contracts/Lottery/Lottery.json";
import {JsonRpcSigner} from "@ethersproject/providers/src.ts/json-rpc-provider";

export class DeployService {
    signer: JsonRpcSigner;

    constructor(_signer) {
        this.signer = _signer
    }

    async onDeploy(ticketPrice: string, purchasable: boolean): Promise<ethers.providers.TransactionReceipt> {
        try {
            const factory = new ethers.ContractFactory(abi, evm.bytecode.object, this.signer)
            const contract = await factory.deploy(
                ethers.utils.parseUnits(ticketPrice, 'ether'),
                purchasable
            )
            return await contract.deployTransaction.wait()
        } catch (e) {
            throw e
        }
    }
}
