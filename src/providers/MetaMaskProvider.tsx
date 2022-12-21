import {createContext, ReactNode, useContext, useEffect, useState} from "react";
import {ethers} from "ethers";
import {ChainEnum} from "../utils/enums/ChainEnum";
import {Web3Provider} from "@ethersproject/providers/src.ts/web3-provider";

type MetaMaskContextTypes = {
    ethereum: any;
    chain: ChainEnum | undefined;
    web3Provider: Web3Provider | undefined;
    accountConnected: string;
    accountBalance: string | undefined;
};

const MetaMaskAccountContext = createContext<MetaMaskContextTypes>({
    ethereum: undefined,
    chain: undefined,
    web3Provider: undefined,
    accountConnected: '',
    accountBalance: '',
});

type ProviderProps = {
    children?: ReactNode;
};

const MetaMaskAccountProvider = ({children}: ProviderProps) => {
    const [ethereum, setEthereum] = useState<any>();
    const [chain, setChain] = useState<ChainEnum>();
    const [web3Provider, setWeb3Provider] = useState<Web3Provider>();
    const [accounts, setAccounts] = useState<Array<any>>([])
    const [accountConnected, setAccountConnected] = useState<MetaMaskContextTypes['accountConnected']>('');
    const [accountBalance, setAccountBalance] = useState<MetaMaskContextTypes['accountBalance']>();

    const initEthereum = async () => {
        if (window.ethereum) {
            // Reload if chain changes
            window.ethereum.on('chainChanged', () => window.location.reload());
            // Reload if account changes
            window.ethereum.on('accountsChanged', (accounts: Array<string>) => setAccounts(accounts));

            setChain(await window.ethereum.request({method: 'eth_chainId'}))
            const provider = new ethers.providers.Web3Provider(window.ethereum)
            setWeb3Provider(provider)
            setEthereum(window.ethereum);
        }
    }

    const fetchAccounts = async () => {
        if (ethereum) {
            const accounts = await ethereum.request({method: 'eth_requestAccounts'});
            setAccounts(accounts)
        }
    };

    const fetchAccountBalance = async () => {
        if (ethereum && accountConnected && web3Provider) {
            const ethBalance = await web3Provider.getBalance(accountConnected)
            setAccountBalance(ethers.utils.formatEther(ethBalance))
        }
    };

    useEffect(() => {
        void initEthereum()
    }, []);

    useEffect(() => {
        void fetchAccounts()
    }, [ethereum])

    useEffect(() => {
        if (accounts && Array.isArray(accounts) && accounts.length) {
            setAccountConnected(accounts[0])
            void fetchAccountBalance()
        } else {
            setAccountConnected('')
            setAccountBalance('')
        }
    }, [accounts]);

    const value = {
        ethereum,
        chain,
        web3Provider,
        accountConnected,
        accountBalance,
    };

    return (
        <MetaMaskAccountContext.Provider value={value}>
            {children}
        </MetaMaskAccountContext.Provider>
    )
}

export const useMetaMaskAccount = () => useContext(MetaMaskAccountContext);
export default MetaMaskAccountProvider;
