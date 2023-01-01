import {createContext, ReactNode, useContext, useEffect, useState} from "react";
import {useMetaMaskAccount} from "./MetaMaskProvider";
import {ethers} from "ethers";
// Deployed contract address & abi
import {address, abi} from "../utils/constants";
import {ContractService} from "../services/contract.service";

type ContractContextType = {
    contract: ethers.Contract | undefined;
    contractSigned: ethers.Contract | undefined;
    contractService: ContractService | undefined;
};

const ContractContext = createContext<ContractContextType>({
    contract: undefined,
    contractSigned: undefined,
    contractService: undefined
});

type ProviderProps = {
    children?: ReactNode;
};

const ContractProvider = ({children}: ProviderProps) => {
    const {accountConnected, web3Provider, web3Enabled} = useMetaMaskAccount()
    const [contract, setContract] = useState<ethers.Contract>()
    const [contractSigned, setContractSigned] = useState<ethers.Contract>()
    // Instance of service
    const [contractService, setContractService] = useState<ContractService>()

    useEffect(() => {
        if (web3Enabled) {
            const _contract = new ethers.Contract(address, abi, web3Provider)
            const _signed = _contract.connect(web3Provider.getSigner())
            setContract(_contract)
            setContractSigned(_signed)
            setContractService(new ContractService(_signed, web3Provider, accountConnected))
        }
    }, [web3Enabled])

    const value = { contract, contractSigned, contractService };

    return (
        <ContractContext.Provider value={value}>
            {children}
        </ContractContext.Provider>
    )
}

export const useContract = () => useContext(ContractContext)

export default ContractProvider;
