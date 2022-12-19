import {createContext, ReactNode, useContext, useEffect, useState} from "react";
import {useMetaMaskAccount} from "./MetaMaskProvider";
import {ethers} from "ethers";
import {address} from "../utils/constants/address";
import {abi} from "../utils/constants/abi";

type ContractContextType = {
    contract: ethers.Contract | undefined;
};

const ContractContext = createContext<ContractContextType>({
    contract: undefined
});

type ProviderProps = {
    children?: ReactNode;
};

const ContractProvider = ({children}: ProviderProps) => {
    const {ethereum, web3Provider} = useMetaMaskAccount()
    const [contract, setContract] = useState<ethers.Contract>()

    useEffect(() => {
        if (ethereum && web3Provider) {
            const contract = new ethers.Contract(address, abi, web3Provider)
            setContract(contract)
        }
    }, [ethereum, web3Provider])

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