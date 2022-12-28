import {createContext, ReactNode, useContext, useEffect, useState} from "react";
import {useMetaMaskAccount} from "./MetaMaskProvider";
import {ethers} from "ethers";
// Deployed contract address & abi
import {address, abi} from "../utils/constants";

type ContractContextType = {
    contract: ethers.Contract | undefined;
    signedContract: ethers.Contract | undefined;
};

const ContractContext = createContext<ContractContextType>({
    contract: undefined,
    signedContract: undefined
});

type ProviderProps = {
    children?: ReactNode;
};

const ContractProvider = ({children}: ProviderProps) => {
    const {web3Provider} = useMetaMaskAccount()
    const [contract, setContract] = useState<ethers.Contract>()
    const [signedContract, setSignedContract] = useState<ethers.Contract>()

    useEffect(() => {
        if (web3Provider) {
            const c = new ethers.Contract(address, abi, web3Provider)
            setContract(c)
            setSignedContract(c.connect(web3Provider.getSigner()))
        }
    }, [web3Provider])

    const value = { contract, signedContract };

    return (
        <ContractContext.Provider value={value}>
            {children}
        </ContractContext.Provider>
    )
}

export const useContract = () => useContext(ContractContext)

export default ContractProvider;
