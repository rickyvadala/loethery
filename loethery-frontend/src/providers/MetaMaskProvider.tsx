import {createContext, ReactNode, useContext, useEffect, useState} from "react";
import {ethers} from "ethers";
import {ChainEnum} from "../utils/enums/ChainEnum";
import {Web3Provider} from "@ethersproject/providers/src.ts/web3-provider";

type MetaMaskContextTypes = {
    chain: ChainEnum | undefined;
    chainValid: boolean;
    accountConnected: string;
    accountBalance: string;
    web3Provider: Web3Provider | undefined;
    web3Enabled: boolean;
};

const MetaMaskAccountContext = createContext<MetaMaskContextTypes>({
    chain: undefined,
    chainValid: false,
    accountConnected: '',
    accountBalance: '',
    web3Provider: undefined,
    web3Enabled: false,
});

type ProviderProps = {
    children?: ReactNode;
};

const MetaMaskAccountProvider = ({children}: ProviderProps) => {
    const [accounts, setAccounts] = useState<Array<MetaMaskContextTypes['accountConnected']>>([])
    const [chain, setChain] = useState<MetaMaskContextTypes["chain"]>();
    const [chainValid, setChainValid] = useState<MetaMaskContextTypes['chainValid']>(false);
    const [accountConnected, setAccountConnected] = useState<MetaMaskContextTypes['accountConnected']>('');
    const [accountBalance, setAccountBalance] = useState<MetaMaskContextTypes['accountBalance']>('');
    const [web3Provider, setWeb3Provider] = useState<MetaMaskContextTypes['web3Provider']>();
    const [web3Enabled, setWeb3Enabled] = useState<MetaMaskContextTypes['web3Enabled']>(false);

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
            try {
                setAccounts(await window.ethereum.request({method: 'eth_requestAccounts'}))
            } catch (e) {
                console.warn('Connect to MetaMask wallet')
            }
        }
    }

    const fetchAccountBalance = async (_connected) => {
        setAccountBalance(ethers.utils.formatEther(await web3Provider.getBalance(_connected)))
    };

    useEffect(() => {
        void initEthereum()
    }, []);

    useEffect(() => {
        setWeb3Enabled(!!(web3Provider && chainValid && accountConnected))
    }, [accountConnected]);

    const hasAccounts = (_accounts) => _accounts && Array.isArray(_accounts) && _accounts.length;
    useEffect(() => {
        if (hasAccounts(accounts)) {
            const _connected = accounts[0]
            setAccountConnected(_connected)
            void fetchAccountBalance(_connected)
        } else {
            setAccountConnected('')
            setAccountBalance('')
        }
    }, [accounts]);

    const value = {
        chain,
        chainValid,
        accountConnected,
        accountBalance,
        web3Provider,
        web3Enabled
    };

    return (
        <MetaMaskAccountContext.Provider value={value}>
            {children}
        </MetaMaskAccountContext.Provider>
    )
}

export const useMetaMaskAccount = () => useContext(MetaMaskAccountContext);

export default MetaMaskAccountProvider;
