import {createContext, ReactNode, useContext, useEffect, useState} from "react";
import {useMetaMaskAccount} from "./MetaMaskProvider";
import {ethers} from "ethers";
import {address} from "../utils/constants/address";
import {abi} from "../utils/constants/abi";

type ContractType = {
    contract: any;
};

const ContractContext = createContext<ContractType>({
    contract: null
});

type ProviderProps = {
    children?: ReactNode;
};

const ContractProvider = ({children}: ProviderProps) => {
    const {ethereum, provider} = useMetaMaskAccount()
    const [contract, setContract] = useState<ethers.Contract>()

    useEffect(() => {
        if (ethereum && provider) {
            const provider = new ethers.providers.Web3Provider(ethereum)
            const contract = new ethers.Contract(address, abi, provider)
            setContract(contract)
        }
    }, [ethereum, provider])

    const value = {
        contract
    };

    return (
        <ContractContext.Provider value={value}>
            {children}
        </ContractContext.Provider>
    )
}

export const useContract = () => {
    return useContext(ContractContext);
}

export default ContractProvider;
