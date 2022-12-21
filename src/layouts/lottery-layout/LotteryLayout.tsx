import React, {useEffect, useState} from 'react'
import {Dialog as MobileMenu} from '@headlessui/react'
import {Bars3Icon, CheckCircleIcon, XCircleIcon, XMarkIcon} from '@heroicons/react/24/outline'
import {NavigateFunction, Outlet, useLocation, useNavigate} from "react-router-dom";
import {Logo} from "../../components/atoms/logo/Logo";
import {Loader} from "../../components/atoms/loader/Loader";
import {ProgressBar} from "../../components/atoms/progress-bar/ProgressBar";
import etherCoin from "../../assets/img/ether-coin.png";
import {useMetaMaskAccount} from "../../providers/MetaMaskProvider";
import {ChainEnum} from "../../utils/enums/ChainEnum";
import {Dialog, DialogType} from "../../components/atoms/dialog/Dialog";

const navigation = [
    {name: 'Home', url: '/'},
    {name: 'Play', url: '/play'},
    {name: 'Contract', url: '/contract'},
    {name: 'Social', url: '/social'},
]


export const LotteryLayout = () => {
    const location = useLocation();
    const [loading, setLoading] = useState<boolean>(false)
    const [progressLoading, setProgressLoading] = useState<boolean>(false)
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
    const navigate: NavigateFunction = useNavigate();
    const {ethereum, chain, accountConnected} = useMetaMaskAccount();

    const [disabled, setDisabled] = useState<boolean>(true)
    const [isOpen, setIsOpen] = useState<boolean>(false)
    const [dialog, setDialog] = useState<Partial<DialogType>>()
    const openDialog = ({message, title, timeout, closeOnBlur}: Partial<DialogType> = {}) => {
        setIsOpen(true)
        setDialog({message, title, timeout, closeOnBlur})
    }

    useEffect(() => {
        setDisabled(!(accountConnected && chain === ChainEnum.GOERLI_TEST_NETWORK && !progressLoading) )
    }, [progressLoading, accountConnected, chain])

    useEffect(() => {
        !window.ethereum && openDialog()
    }, [])


    const checkers = [
        {name: 'MetaMask', check: () => ethereum},
        {name: 'Network', check: () => chain === ChainEnum.GOERLI_TEST_NETWORK},
        {name: 'Wallet', check: () => accountConnected},
    ]

    return (
        <div className="lottery-layout isolate">
            <Dialog {...dialog} isOpen={isOpen} setIsOpen={setIsOpen}/>
            <div className="z-50 bg-amber-500 px-8 py-6 fixed min-w-full ">
                <Loader loading={loading}/>
                <ProgressBar progressLoading={progressLoading}/>
                <div>
                    <nav className="flex h-9 items-center" aria-label="Global">
                        <div className={"flex items-center"}>
                            <div className="flex lg:min-w-0 lg:flex-1 text-3xl font-bold m-r-8" aria-label="Global">
                                <Logo bracketsColor={"text-indigo-900"}/>
                            </div>
                            <div className="hidden lg:flex min-w-0 flex-1 justify-center gap-x-12 text-lg">
                                {navigation.map((item) => (
                                    <a key={item.name} onClick={() => navigate(item.url)}
                                       className="cursor-pointer font-semibold text-white hover:text-black">
                                        {item.name}
                                    </a>
                                ))}
                            </div>
                        </div>
                        <div className="hidden lg:flex lg:gap-2 lg:flex-1 lg:justify-end text-white text-md">
                            {checkers.map(c => (
                                <span key={c.name}
                                      onClick={() => !c.check() && openDialog()}
                                      className={`${!c.check() ? 'animate-bounce cursor-pointer bg-gray-800' : 'cursor-default  bg-indigo-800'} gap-2 flex rounded-lg px-3 py-2`}>
                                    {c.name}
                                    {c.check()
                                        ? <CheckCircleIcon className="h-6 w-6"/>
                                        : <XCircleIcon className="h-6 w-6"/>
                                    }
                                </span>
                            ))}
                        </div>
                        <div className="absolute right-8 flex lg:hidden">
                            <button type="button"
                                    className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-white"
                                    onClick={() => setMobileMenuOpen(true)}
                            >
                                <span className="sr-only">Open main menu</span>
                                <Bars3Icon className="h-8 w-8" aria-hidden="true"/>
                            </button>
                        </div>
                    </nav>
                    <MobileMenu as="div" open={mobileMenuOpen} onClose={setMobileMenuOpen}>
                        <MobileMenu.Panel
                            className="fixed inset-0 z-20 overflow-y-auto bg-gradient-to-r from-indigo-900 to-[#910572] px-8 py-6 lg:hidden">
                            <div className="flex h-9 items-center justify-between">
                                <div className="flex text-3xl">
                                    <Logo/>
                                </div>
                                <div className="flex">
                                    <button
                                        type="button"
                                        className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-white"
                                        onClick={() => setMobileMenuOpen(false)}
                                    >
                                        <span className="sr-only">Close menu</span>
                                        <XMarkIcon className="h-6 w-6" aria-hidden="true"/>
                                    </button>
                                </div>
                            </div>
                            <div className="mt-6 flow-root">
                                <div className="-my-6 divide-y divide-gray-500/10">
                                    <div className="space-y-2 py-6">
                                        {navigation.map((item) => (
                                            <a key={item.name}
                                               className="cursor-pointer -mx-3 block rounded-lg py-2 px-3 text-base font-semibold leading-7 text-white hover:bg-gray-400/10"
                                               onClick={() => {
                                                   navigate(item.url);
                                                   setMobileMenuOpen(false)
                                               }}
                                            >
                                                {item.name}
                                            </a>
                                        ))}
                                    </div>
                                    <div className="py-6">
                                        {checkers.map(c => (
                                            <span key={c.name}
                                                  onClick={() => openDialog()}
                                                  className={`${!c.check() ? 'bg-gray-100 text-red-600' : 'bg-amber-500 text-white'} -mx-3 my-2 flex gap-2 bg-amber-500 drop-shadow-md rounded-lg py-2.5 px-3 text-base font-semibold cursor-pointer`}>
                                                {c.name}
                                                {c.check()
                                                    ? <CheckCircleIcon className="h-6 w-6"/>
                                                    : <XCircleIcon className="h-6 w-6"/>
                                                }
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </MobileMenu.Panel>
                    </MobileMenu>
                </div>
            </div>
            <main className="bg-gradient-to-r from-indigo-800 to-[#910572] relative">
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
        </div>
    )
}
