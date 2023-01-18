import {createContext, ReactNode, useContext} from "react";
import {useMetaMaskAccount} from "./MetaMaskProvider";
import {ethers} from "ethers";
import {officialContractAddress} from "../utils/constants/contracts/Lottery/address";
import {abi} from '../utils/constants/contracts/Lottery/Lottery.json';
import {LotteryService} from "../services/lottery.service";
import {DeployService} from "../services/deploy.service";

type ContractContextType = {
    lotteryServiceFactory: (string: string) => LotteryService
    deployServiceFactory: () => DeployService
};

const ContractContext = createContext<ContractContextType>({
    lotteryServiceFactory: undefined,
    deployServiceFactory: undefined,
});

type ProviderProps = {
    children?: ReactNode;
};

const ContractProvider = ({children}: ProviderProps) => {
    const {accountConnected, web3Provider, web3Enabled} = useMetaMaskAccount()

    const lotteryServiceFactory = (_contractAddress = officialContractAddress) => {
        if (!web3Enabled) throw new Error('Web 3 not enabled')
        const _contract = new ethers.Contract(_contractAddress, abi, web3Provider)
        const _signed = _contract.connect(web3Provider.getSigner())
        return new LotteryService(_signed, web3Provider, accountConnected)
    };

    const deployServiceFactory = () => {
        if (!web3Enabled) throw new Error('Web 3 not enabled')
        return new DeployService(web3Provider.getSigner())
    };

    const value = {lotteryServiceFactory, deployServiceFactory};

    return (
        <ContractContext.Provider value={value}>
            {children}
        </ContractContext.Provider>
    )
}

export const useContract = () => useContext(ContractContext)

export default ContractProvider;
