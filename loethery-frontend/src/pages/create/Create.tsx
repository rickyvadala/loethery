import {Logo} from "../../components/atoms/logo/Logo";
import etherCoin from "../../assets/img/ether-coin.png";
import React from "react";
import {Action} from "../../components/atoms/action/Action";
import {useContract} from "../../providers/ContractProvider";
import {useOutletContext} from "react-router-dom";
import { useState } from 'react'
import { Switch } from '@headlessui/react'
import {addLottery} from "../../services/firestore.service";
import {useMetaMaskAccount} from "../../providers/MetaMaskProvider";
import {InformationCircleIcon   } from "@heroicons/react/24/outline";


export const Create = () => {
    const [purchasable, setPurchasable] = useState(true)
    const [ticketPrice, setTicketPrice] = useState('0.02')
    const {accountConnected} = useMetaMaskAccount()

    const {deployService} = useContract()
    const [setLoading] = useOutletContext<any>();

    const deploy = async () => {
        try {
            setLoading(true)
            const deployed = await deployService.onDeploy(ticketPrice, purchasable)
            await addLottery(accountConnected, deployed.contractAddress)
        } catch (e) {
            console.log(e)
        } finally {
            setLoading(false)
        }
    }
    return (
        <div
            className="columns-2 gap-2 flex justify-center items-center min-h-[calc(100vh-2.5rem)] p-8 pt-24">
            <div className="text-center z-10 text-xl text-white">
                <h1 className="text-6xl md:text-7xl lg:text-8xl drop-shadow-2xl">
                    <Logo/>
                </h1>
                <h5 className="mt-8 flex flex-col items-start">
                    <code>1. Create your own lottery</code>
                    <code>2. Share it with anybody</code>
                    <code>3. Play with your friends</code>
                </h5>
                <div className={'flex gap-4 pt-4'}>
                    <div className="flex justify-start flex-col">
                        <label htmlFor="price" className="text-left block text-sm font-medium text-white">Ticket Price</label>
                        <div className="relative mt-1 rounded-md shadow-sm">
                            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                                <span className="text-gray-500 sm:text-sm">$</span>
                            </div>
                            <input type="number" name="price" id="price"
                                   min="0"
                                   onChange={e => setTicketPrice(e.target.value)}
                                   value={ticketPrice}
                                   className="text-black block w-full rounded-md border-gray-300 pl-7 pr-12 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                   placeholder="Set a ticket price!"/>
                        </div>
                    </div>
                    <div className="flex justify-between flex-col relative">
                        <label className="text-left block text-sm font-medium text-white min-w-[110px]">
                            Purchasable: {purchasable ? 'On' : 'Off'}
                        </label>
                        <Switch
                            checked={purchasable}
                            onChange={setPurchasable}
                            className={`${purchasable ? 'bg-amber-500' : 'bg-gray-400'}
          relative inline-flex h-[38px] w-[74px] shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2  focus-visible:ring-white focus-visible:ring-opacity-75`}
                        >
                            <span className="sr-only">Use setting</span>
                            <span
                                aria-hidden="true"
                                className={`${purchasable ? 'translate-x-9' : 'translate-x-0'}
            pointer-events-none inline-block h-[34px] w-[34px] transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out`}
                            />
                        </Switch>
                        <InformationCircleIcon className="absolute bottom-[7px] right-0 h-6 w-6"/>

                    </div>

                </div>
                <div className="mt-8">
                    <Action onClick={deploy} label={'Create!'}/>
                </div>
            </div>
            <div className="max-w-md min-w-sm absolute sm:relative opacity-20 sm:opacity-90">
                <img src={etherCoin} alt="ethereum coin" className="drop-shadow-2xl"/>
            </div>
        </div>
    );
}
