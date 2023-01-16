import React, {useEffect, useState} from 'react'
import {NavigateFunction, Outlet, useLocation, useNavigate} from "react-router-dom";
import {Loader} from "../../components/atoms/loader/Loader";
import {ProgressBar} from "../../components/atoms/progress-bar/ProgressBar";
import etherCoin from "../../assets/img/ether-coin.png";
import {useMetaMaskAccount} from "../../providers/MetaMaskProvider";
import {Dialog, DialogType} from "../../components/atoms/dialog/Dialog";
import {Navbar} from "../../components/organism/navbar/Navbar";
import {Footer} from "../../components/organism/footer/Footer";
import {dialogMessages} from "../../utils/constants";
// import EtherscanService from "../../services/etherscan.service";

export type NavbarItemType = { name: string, function: Function }
export const LotteryLayout = () => {
    const location = useLocation();
    const navigate: NavigateFunction = useNavigate();

    const [loading, setLoading] = useState<boolean>(false)
    const [progressLoading, setProgressLoading] = useState<boolean>(false)
    const {chainValid, accountConnected, web3Enabled} = useMetaMaskAccount();

    const [disabled, setDisabled] = useState<boolean>(true)
    const [isOpen, setIsOpen] = useState<boolean>(false)
    const [dialog, setDialog] = useState<Partial<DialogType>>()
    const openDialog = ({message, title, timeout}: Partial<DialogType> = {}) => {
        setIsOpen(true)
        setDialog({message, title, timeout})
    }

    useEffect(() => {
        setDisabled(!(web3Enabled && !progressLoading))
    }, [progressLoading, web3Enabled])

    useEffect(() => {
        !window.ethereum && openDialog({...dialogMessages.ALL_STEPS})
        // EtherscanService.getBlockCountdown('16701588').then(console.log)
    }, [])

    const hasImages = () =>  location.pathname !== '/' && location.pathname !== '/create';
    const navigation: NavbarItemType[] = [
        {name: 'Home', function: () => navigate('/')},
        {name: 'Play', function: () => navigate('/play')},
        {name: 'Create', function: () => navigate('/create')},
        {name: 'Lotteries', function: () => navigate('/lotteries')},
        {name: 'Code', function: () => navigate('/code')},
    ]

    const checkers: NavbarItemType[] = [
        {name: 'MetaMask', function: () => window.ethereum},
        {name: 'Network', function: () => chainValid},
        {name: 'Wallet', function: () => accountConnected},
    ]

    return (
        <div className="lottery-layout isolate">
            <Dialog {...dialog} isOpen={isOpen} setIsOpen={setIsOpen}/>
            <div className="z-50 bg-amber-500 px-8 py-6 fixed min-w-full shadow-xl">
                <Loader loading={loading}/>
                <ProgressBar progressLoading={progressLoading}/>
                <Navbar navigation={navigation} checkers={checkers} openDialog={openDialog}/>
            </div>
            <main className={`
            ${location.pathname === '/play' && !(accountConnected && chainValid) && 'blur-sm'} bg-gradient-to-r from-indigo-800 to-[#910572] relative pb-12`}>
                {hasImages() &&
                  <>
                    <div className="z-0 max-w-md min-w-sm absolute opacity-20 right-0 top-24">
                      <img src={etherCoin} alt="ethereum coin" className="drop-shadow-2xl"/>
                    </div>
                    <div className="z-0 max-w-md min-w-sm absolute opacity-20 left-4 bottom-12">
                      <img src="/meta-fox.svg" alt="ethereum coin" className="w-full drop-shadow-2xl"/>
                    </div>
                  </>
                }
                <Outlet context={[setLoading, setProgressLoading, openDialog, disabled]}/>
            </main>
            <Footer/>
        </div>
    )
}
