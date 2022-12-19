import {createContext, ReactNode, useContext, useEffect, useState} from "react";
import {ethers} from "ethers";
import {Dialog} from "../components/atoms/dialog/Dialog";
import {ChainEnum} from "../utils/enums/ChainEnum";

type MetaMaskContextTypes = {
    ethereum: any;
    connectedAccount: string;
    accountBalance: string | undefined;
};

const MetaMaskAccountContext = createContext<MetaMaskContextTypes>({
    ethereum: null,
    connectedAccount: '',
    accountBalance: '',
});

type ProviderProps = {
    children?: ReactNode;
};

const MetaMaskAccountProvider = ({children}: ProviderProps) => {
    const [ethereum, setEthereum] = useState<any>(null);
    const [accounts, setAccounts] = useState<Array<any>>([])
    const [connectedAccount, setConnectedAccount] = useState<MetaMaskContextTypes['connectedAccount']>('');
    const [balance, setBalance] = useState<MetaMaskContextTypes['accountBalance']>();
    const [error, setError] = useState<{ message?: string, title?: string }>({})
    const [isOpen, setIsOpen] = useState<boolean>(false)

    const initEthereum = async () => {
        if (window.ethereum) {
            // Reload if chain changes
            window.ethereum.on('chainChanged', () => window.location.reload());

            // Reload if account changes
            window.ethereum.on('accountsChanged', (accounts: Array<string>) => {
                setAccounts(accounts)
            });

            const chainId = await window.ethereum.request({method: 'eth_chainId'});
            if (chainId === ChainEnum.GOERLI_TEST_NETWORK) {
                setEthereum(window.ethereum);
            } else {
                setError({title: 'Attention', message: 'Please use Goerli testnet'})
                setIsOpen(true)
            }
        }
    }

    const fetchAccounts = async () => {
        if (ethereum) {
            const accounts = await ethereum.request({method: 'eth_accounts'});
            setAccounts(accounts)
        }
    };
    const fetchAccountBalance = async () => {
        if (ethereum && connectedAccount) {
            const provider = new ethers.providers.Web3Provider(ethereum)
            const ethBalance = await provider.getBalance(connectedAccount)
            setBalance(ethers.utils.formatEther(ethBalance))
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
            setConnectedAccount(accounts[0])
            void fetchAccountBalance()
        } else {
            setConnectedAccount('')
            setBalance('')
        }
    }, [accounts]);

    const value = {
        ethereum,
        connectedAccount,
        accountBalance: balance,
    };

    return (
        <MetaMaskAccountContext.Provider value={value}>
            <Dialog {...error} isOpen={isOpen} setIsOpen={setIsOpen}/>
            {children}
        </MetaMaskAccountContext.Provider>
    )
}

export const useMetaMaskAccount = () => {
    return useContext(MetaMaskAccountContext);
}

export default MetaMaskAccountProvider;
