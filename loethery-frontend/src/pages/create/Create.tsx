import {Logo} from "../../components/atoms/logo/Logo";
import etherCoin from "../../assets/img/ether-coin.png";
import React, {useState} from "react";
import {Action} from "../../components/atoms/action/Action";
import {useContract} from "../../providers/ContractProvider";
import {useOutletContext} from "react-router-dom";
import {addLottery} from "../../services/firestore.service";
import {useMetaMaskAccount} from "../../providers/MetaMaskProvider";
import {InformationCircleIcon} from "@heroicons/react/24/outline";
import {LSwitch} from "../../components/atoms/switch/LSwitch";
import {LInput} from "../../components/atoms/input/LInput";


export const Create = () => {
    const [purchasable, setPurchasable] = useState(true)
    const [ticketPrice, setTicketPrice] = useState('0.02')
    const {accountConnected} = useMetaMaskAccount()

    const {deployServiceFactory} = useContract()
    const [setLoading] = useOutletContext<any>();

    const deploy = async () => {
        try {
            setLoading(true)
            const deployed = await deployServiceFactory().onDeploy(ticketPrice, purchasable)
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
                <h1 className="cursor-default text-6xl md:text-7xl lg:text-8xl drop-shadow-2xl">
                    <Logo/>
                </h1>
                <h5 className="mt-8 flex flex-col items-start">
                    <code>1. Create your own lottery</code>
                    <code>2. Share it with everyone</code>
                    <code>3. Play with your friends</code>
                </h5>
                <div className={'flex gap-4 pt-4'}>
                    <div className="flex justify-start flex-col">
                        <label htmlFor="input" className="mb-1 text-left block text-sm font-medium text-white">Ticket
                            Price
                        </label>
                        <LInput value={ticketPrice} setValue={setTicketPrice}/>
                    </div>
                    <div className="flex justify-between flex-col relative">
                        <label className="text-left block text-sm font-medium text-white min-w-[110px]">
                            Purchasable: {purchasable ? 'On' : 'Off'}
                        </label>
                        <LSwitch purchasable={purchasable} setPurchasable={setPurchasable}/>
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
