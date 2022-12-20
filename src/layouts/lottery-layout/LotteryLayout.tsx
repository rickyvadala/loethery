import React, {useState} from 'react'
import {Dialog} from '@headlessui/react'
import {Bars3Icon, XMarkIcon} from '@heroicons/react/24/outline'
import {NavigateFunction, Outlet, useLocation, useNavigate} from "react-router-dom";
import {Logo} from "../../components/atoms/logo/Logo";
import {Loader} from "../../components/atoms/loader/Loader";
import {ProgressBar} from "../../components/atoms/progress-bar/ProgressBar";
import etherCoin from "../../assets/img/ether-coin.png";

const navigation = [
    {name: 'Home', url: '/'},
    {name: 'Play', url: '/play'},
    {name: 'Contract', url: '/contract'},
    {name: 'Social', url: '/social'},
]

const LotteryLayout = () => {
    const location = useLocation();
    const [loading, setLoading] = useState<boolean>(false)
    const [progressLoading, setProgressLoading] = useState<boolean>(false)
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
    const navigate: NavigateFunction = useNavigate();

    return (
        <div className="lottery-layout isolate">
            <div className="z-50 bg-amber-500 px-8 py-6 fixed min-w-full ">
                <Loader loading={loading}/>
                <ProgressBar progressLoading={progressLoading}/>
                <div>
                    <nav className="flex h-9 items-center justify-between" aria-label="Global">
                        <div className="flex lg:min-w-0 lg:flex-1 text-3xl font-bold" aria-label="Global">
                            <Logo bracketsColor={"text-indigo-900"}/>
                        </div>
                        <div className="flex lg:hidden">
                            <button type="button"
                                    className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-white"
                                    onClick={() => setMobileMenuOpen(true)}
                            >
                                <span className="sr-only">Open main menu</span>
                                <Bars3Icon className="h-8 w-8" aria-hidden="true"/>
                            </button>
                        </div>
                        <div className="hidden lg:flex lg:min-w-0 lg:flex-1 lg:justify-center lg:gap-x-12">
                            {navigation.map((item) => (
                                <a key={item.name} onClick={() => navigate(item.url)}
                                   className="cursor-pointer font-semibold text-white hover:text-gray-900">
                                    {item.name}
                                </a>
                            ))}
                        </div>
                        <div className="hidden lg:flex lg:min-w-0 lg:flex-1 lg:justify-end">
                            <a href="#"
                               className="inline-block rounded-lg px-3 py-1.5 text-sm font-semibold leading-6 text-gray-900 shadow-sm ring-1 ring-gray-900/10 hover:ring-gray-900/20"
                            >
                                Log in
                            </a>
                        </div>
                    </nav>
                    <Dialog as="div" open={mobileMenuOpen} onClose={setMobileMenuOpen}>
                        <Dialog.Panel
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
                                                   navigate(item.url)
                                                   setMobileMenuOpen(false)
                                               }}
                                            >
                                                {item.name}
                                            </a>
                                        ))}
                                    </div>
                                    <div className="py-6">
                                        <a
                                            href="#"
                                            className="-mx-3 block rounded-lg py-2.5 px-3 text-base font-semibold leading-6 text-white hover:bg-gray-400/10"
                                        >
                                            Log in
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </Dialog.Panel>
                    </Dialog>
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
                <Outlet context={[setLoading, progressLoading, setProgressLoading]}/>
            </main>
        </div>
    )
}

export default LotteryLayout;
