import {createContext, ReactNode, useContext, useEffect, useState} from "react";
import {ethers} from "ethers";
import {ChainEnum} from "../utils/enums/ChainEnum";
import {Web3Provider} from "@ethersproject/providers/src.ts/web3-provider";

type MetaMaskContextTypes = {
    chain: ChainEnum | undefined;
    chainValid: boolean;
    web3Provider: Web3Provider | undefined;
    accountConnected: string;
    accountBalance: string;
};

const MetaMaskAccountContext = createContext<MetaMaskContextTypes>({
    chain: undefined,
    chainValid: false,
    web3Provider: undefined,
    accountConnected: '',
    accountBalance: '',
});

type ProviderProps = {
    children?: ReactNode;
};

const MetaMaskAccountProvider = ({children}: ProviderProps) => {
    const [chain, setChain] = useState<ChainEnum>();
    const [chainValid, setChainValid] = useState<boolean>(false);
    const [web3Provider, setWeb3Provider] = useState<Web3Provider>();
    const [accounts, setAccounts] = useState<Array<any>>([])
    const [accountConnected, setAccountConnected] = useState<MetaMaskContextTypes['accountConnected']>('');
    const [accountBalance, setAccountBalance] = useState<MetaMaskContextTypes['accountBalance']>('');

    const initEthereum = async () => {
        if (window.ethereum) {
            // Reload if chain changes
            window.ethereum.on('chainChanged', () => window.location.reload());
            // Reload if account changes
            window.ethereum.on('accountsChanged', (accounts: Array<string>) => setAccounts(accounts));

            const provider = new ethers.providers.Web3Provider(window.ethereum)
            setWeb3Provider(provider)
            const chain = await window.ethereum.request({method: 'eth_chainId'})
            setChain(chain)
            setChainValid(chain === ChainEnum.GOERLI_TEST_NETWORK)
            setAccounts(await window.ethereum.request({method: 'eth_requestAccounts'}))
        }
    }

    const fetchAccountBalance = async () => {
        if (window.ethereum && accountConnected && web3Provider) {
            const ethBalance = await web3Provider.getBalance(accountConnected)
            setAccountBalance(ethers.utils.formatEther(ethBalance))
        }
    };

    useEffect(() => {
        void initEthereum()
    }, []);

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
        chain,
        chainValid,
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
