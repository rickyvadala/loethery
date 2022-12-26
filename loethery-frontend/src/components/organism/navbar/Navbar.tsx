import React, {useState} from "react";
import {Logo} from "../../atoms/logo/Logo";
import {Bars3Icon, CheckCircleIcon, XCircleIcon, XMarkIcon} from "@heroicons/react/24/outline";
import {Dialog as MobileMenu} from '@headlessui/react'
import {NavbarItemType} from "../../../layouts/lottery-layout/LotteryLayout";
import {Social} from "../../atoms/social/Social";

type NavbarType = {
    navigation: NavbarItemType[],
    checkers: NavbarItemType[],
    openDialog: Function
}
export const Navbar: React.FC<NavbarType> = ({navigation, checkers, openDialog}) => {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

    return (
        <>
            <nav className="flex h-9 items-center" aria-label="Global">
                <div className={"flex items-center"}>
                    <div className="flex lg:flex-1 text-3xl font-bold mr-8" aria-label="Global">
                        <Logo bracketsColor={"text-indigo-900"}/>
                    </div>
                    <div className="hidden lg:flex flex-1 justify-center gap-x-6 text-lg">
                        {navigation.map((item) => (
                            <a key={item.name}
                               onClick={() => item.function()}
                               className="cursor-pointer block rounded-lg py-2 px-3 text-base font-semibold text-white hover:bg-indigo-800"
                            >
                                {item.name}
                            </a>
                        ))}
                    </div>
                </div>
                <div className="hidden lg:flex lg:gap-2 lg:flex-1 lg:justify-end text-white text-md">
                    {checkers.map(item => (
                        <span key={item.name}
                              onClick={() => !item.function() && openDialog()}
                              className={`${!item.function() ? 'animate-bounce cursor-pointer bg-gray-800' : 'cursor-default  bg-indigo-800'} gap-2 flex rounded-lg px-3 py-2`}>
                            {item.name}
                            {item.function()
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
                                           item.function();
                                           setMobileMenuOpen(false)
                                       }}
                                    >
                                        {item.name}
                                    </a>
                                ))}
                            </div>
                            <div className="py-6 mb-8">
                                {checkers.map(item => (
                                    <span key={item.name}
                                          onClick={() => openDialog()}
                                          className={`${!item.function() ? 'bg-gray-100 text-red-600' : 'bg-amber-500 text-white'} -mx-3 my-2 flex gap-2 bg-amber-500 drop-shadow-md rounded-lg py-2.5 px-3 text-base font-semibold cursor-pointer`}>
                                        {item.name}
                                        {item.function()
                                            ? <CheckCircleIcon className="h-6 w-6"/>
                                            : <XCircleIcon className="h-6 w-6"/>
                                        }
                                    </span>
                                ))}
                            </div>
                            <Social/>
                        </div>
                    </div>
                </MobileMenu.Panel>
            </MobileMenu>
        </>
    )
}
