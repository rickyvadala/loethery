import React, {useEffect, useState} from 'react'
import {NavigateFunction, Outlet, useLocation, useNavigate} from "react-router-dom";
import {Loader} from "../../components/atoms/loader/Loader";
import {ProgressBar} from "../../components/atoms/progress-bar/ProgressBar";
import etherCoin from "../../assets/img/ether-coin.png";
import {useMetaMaskAccount} from "../../providers/MetaMaskProvider";
import {ChainEnum} from "../../utils/enums/ChainEnum";
import {Dialog, DialogType} from "../../components/atoms/dialog/Dialog";
import {Navbar} from "../../components/organism/navbar/Navbar";
import {Footer} from "../../components/organism/footer/Footer";

export type NavbarItemType = { name: string, function: Function }
export const LotteryLayout = () => {
    const location = useLocation();
    const navigate: NavigateFunction = useNavigate();

    const [loading, setLoading] = useState<boolean>(false)
    const [progressLoading, setProgressLoading] = useState<boolean>(false)
    const {ethereum, chain, accountConnected} = useMetaMaskAccount();

    const [disabled, setDisabled] = useState<boolean>(true)
    const [isOpen, setIsOpen] = useState<boolean>(false)
    const [dialog, setDialog] = useState<Partial<DialogType>>()
    const openDialog = ({message, title, timeout, closeOnBlur}: Partial<DialogType> = {}) => {
        setIsOpen(true)
        setDialog({message, title, timeout, closeOnBlur})
    }

    useEffect(() => {
        setDisabled(!(accountConnected && chain === ChainEnum.GOERLI_TEST_NETWORK && !progressLoading))
    }, [progressLoading, accountConnected, chain])

    useEffect(() => {
        !window.ethereum && openDialog()
    }, [])


    const navigation: NavbarItemType[] = [
        {name: 'Home', function: () => navigate('/')},
        {name: 'Play', function: () => navigate('/play')},
        {name: 'Code', function: () => navigate('/code')},
        {name: '@rickyvadala', function: () => window.open('https://rickyvadala.com/', '_blank')},
    ]

    const checkers: NavbarItemType[] = [
        {name: 'MetaMask', function: () => ethereum},
        {name: 'Network', function: () => chain === ChainEnum.GOERLI_TEST_NETWORK},
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
            <main className="bg-gradient-to-r from-indigo-800 to-[#910572] relative pb-12">
                {location.pathname !== '/' &&
                  <>
                    <div className="z-0 max-w-md min-w-sm absolute opacity-20 right-0 top-24">
                      <img src={etherCoin} alt="ethereum coin" className="drop-shadow-2xl"/>
                    </div>
                    <div className="z-0 max-w-md min-w-sm absolute opacity-20 left-4 bottom-12">
                      <img src="/meta-fox.svg" alt="ethereum coin" className="w-full drop-shadow-2xl"/>
                    </div>
                  </>
                }
                <Outlet context={[setLoading, setProgressLoading, disabled]}/>
            </main>
            <Footer navigation={navigation} />
        </div>
    )
}
