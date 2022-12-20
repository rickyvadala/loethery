import {createContext, ReactNode, useContext, useEffect, useState} from "react";
import {ethers} from "ethers";
import {Dialog, DialogType} from "../components/atoms/dialog/Dialog";
import {ChainEnum} from "../utils/enums/ChainEnum";
import {Web3Provider} from "@ethersproject/providers/src.ts/web3-provider";

type MetaMaskContextTypes = {
    ethereum: any;
    web3Provider: Web3Provider | undefined;
    accountConnected: string;
    accountBalance: string | undefined;
};

const MetaMaskAccountContext = createContext<MetaMaskContextTypes>({
    ethereum: null,
    web3Provider: undefined,
    accountConnected: '',
    accountBalance: '',
});

type ProviderProps = {
    children?: ReactNode;
};

const MetaMaskAccountProvider = ({children}: ProviderProps) => {
    const [ethereum, setEthereum] = useState<any>(null);
    const [web3Provider, setWeb3Provider] = useState<Web3Provider>();
    const [accounts, setAccounts] = useState<Array<any>>([])
    const [accountConnected, setAccountConnected] = useState<MetaMaskContextTypes['accountConnected']>('');
    const [balance, setBalance] = useState<MetaMaskContextTypes['accountBalance']>();

    // Dialog management
    const reload = () => window.location.reload()
    const [isOpen, setIsOpen] = useState<boolean>(false)
    const [dialog, setDialog] = useState<DialogType>({isOpen, setIsOpen: reload})
    const openDialog = (message: Array<any>) => {
        setIsOpen(true)
        setDialog((prevState: DialogType) => ({
            ...prevState,
            message
        }))
    }

    const initEthereum = async () => {
        if (window.ethereum) {
            // Reload if chain changes
            window.ethereum.on('chainChanged', () => reload());
            // Reload if account changes
            window.ethereum.on('accountsChanged', (accounts: Array<string>) => setAccounts(accounts));

            const chainId = await window.ethereum.request({method: 'eth_chainId'});
            if (chainId === ChainEnum.GOERLI_TEST_NETWORK) {
                const provider = new ethers.providers.Web3Provider(window.ethereum)
                setWeb3Provider(provider)
                setEthereum(window.ethereum);
            } else {
                openDialog([
                    'Use the Goerli testnet, here is a faucet to claim ',
                    <a className="text-indigo-800 font-bold"
                       href="https://goerlifaucet.com/"
                       target="_blank">Goerli ETH Tokens</a>,
                ])
            }
        } else {
            openDialog([
                'Install ',
                <a className="text-indigo-800 font-bold" href="https://metamask.io/" target="_blank">MetaMask</a>,
                ' and then reload the page.'
            ])
        }
    }

    const fetchAccounts = async () => {
        if (ethereum) {
            try {
                const accounts = await ethereum.request({method: 'eth_requestAccounts'});
                setAccounts(accounts)
            } catch ({code, message}) {
                if (code === -32002) {
                    openDialog(['Open MetaMask and login.'])
                } else {
                    alert(message)
                }
            }
        }
    };

    const fetchAccountBalance = async () => {
        if (ethereum && accountConnected && web3Provider) {
            const ethBalance = await web3Provider.getBalance(accountConnected)
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
            setAccountConnected(accounts[0])
            void fetchAccountBalance()
        } else {
            setAccountConnected('')
            setBalance('')
        }
    }, [accounts]);

    const value = {
        ethereum,
        web3Provider,
        accountConnected,
        accountBalance: balance,
    };

    return (
        <MetaMaskAccountContext.Provider value={value}>
            <Dialog {...dialog}/>
            {children}
        </MetaMaskAccountContext.Provider>
    )
}

export const useMetaMaskAccount = () => useContext(MetaMaskAccountContext);
export default MetaMaskAccountProvider;
