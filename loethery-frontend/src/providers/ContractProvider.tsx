import {createContext, ReactNode, useContext, useEffect, useState} from "react";
import {useMetaMaskAccount} from "./MetaMaskProvider";
import {ethers} from "ethers";
import {address} from "../utils/constants/contracts/Lottery/address";
import {abi} from '../utils/constants/contracts/Lottery/Lottery.json';
import {LotteryService} from "../services/lottery.service";
import {DeployService} from "../services/deploy.service";

type ContractContextType = {
    contract: ethers.Contract | undefined;
    contractSigned: ethers.Contract | undefined;
    lotteryService: LotteryService | undefined;
    deployService: DeployService | undefined;
};

const ContractContext = createContext<ContractContextType>({
    contract: undefined,
    contractSigned: undefined,
    lotteryService: undefined,
    deployService: undefined,
});

type ProviderProps = {
    children?: ReactNode;
};

const ContractProvider = ({children}: ProviderProps) => {
    const {accountConnected, web3Provider, web3Enabled} = useMetaMaskAccount()
    const [contract, setContract] = useState<ethers.Contract>()
    const [contractSigned, setContractSigned] = useState<ethers.Contract>()
    // Instance of service
    const [lotteryService, setLotteryService] = useState<LotteryService>()
    const [deployService, setDeployService] = useState<DeployService>()

    useEffect(() => {
        if (web3Enabled) {
            const _contract = new ethers.Contract(address, abi, web3Provider)
            const _signed = _contract.connect(web3Provider.getSigner())
            setContract(_contract)
            setContractSigned(_signed)

            setLotteryService(new LotteryService(_signed, web3Provider, accountConnected))
            setDeployService(new DeployService(web3Provider.getSigner()))
        }
    }, [accountConnected, web3Enabled])

    const value = { contract, contractSigned, lotteryService, deployService };

    return (
        <ContractContext.Provider value={value}>
            {children}
        </ContractContext.Provider>
    )
}

export const useContract = () => useContext(ContractContext)

export default ContractProvider;
