import {LModal, ModalType} from "../../../components/atoms/modal/LModal";
import {Dialog as HeadlessUIDialog} from "@headlessui/react";
import React, {useEffect, useState} from "react";
import {useContract} from "../../../providers/ContractProvider";
import {MagnifyingGlassCircleIcon} from "@heroicons/react/24/outline";
import {dialogMessages, EMPTY_ADDRESS} from "../../../utils/constants";
import {LSwitch} from "../../../components/atoms/switch/LSwitch";
import {LInput} from "../../../components/atoms/input/LInput";
import {useOutletContext} from "react-router-dom";

type ManageLotteryModalType = ModalType & {
    address: string
}
type LotteryInfoType = {
    ticketPrice?: string,
    winner?: string,
    players?: Array<string>,
    balance?: string,
    purchasable?: boolean,
}

export const ManageLotteryModal = ({isOpen, setIsOpen, address}: ManageLotteryModalType) => {
    const {lotteryServiceFactory} = useContract()
    const [loading, setLoading] = useState<boolean>(false)
    const [lotteryInfo, setLotteryInfo] = useState<LotteryInfoType>({})
    const [purchasable, setPurchasable] = useState<boolean>()
    const [ticketPrice, setTicketPrice] = useState<string>()
    const [actionsEnabled, setActionsEnabled] = useState<boolean>(true)
    const [,,openDialog] = useOutletContext<any>();

    const fetchData = async () => {
        const service = lotteryServiceFactory(address)
        try {
            setLoading(true)
            const [ticketPrice, winner, players, balance, purchasable] = await Promise.all([
                service.fetchTicketPrice(),
                service.fetchWinner(),
                service.fetchPlayers(),
                service.fetchLotteryBalance(),
                service.fetchPurchasable(),
            ])
            setPurchasable(purchasable);
            setTicketPrice(ticketPrice);
            setLotteryInfo({ticketPrice, winner, players, balance, purchasable})
        } catch (e) {
            console.warn(e)
        } finally {
            setLoading(false)
        }
    }

    const onSetTicketPrice = () => void onTransaction('onSetTicketPrice', ticketPrice)
    const onSetPurchasable = () => void onTransaction('onSetPurchasable', purchasable)
    const onPickWinner = () => void onTransaction('onPickWinner')
    const onTransaction = async (method: string, value?: any) => {
        try {
            setActionsEnabled(false)
            const transaction = await lotteryServiceFactory(address)[method](value)
            await transaction.wait()
            await fetchData()
        } catch (e: any) {
            debugger
            switch (e.code) {
                case 'INSUFFICIENT_FUNDS':
                    openDialog({...dialogMessages.INSUFFICIENT_FUNDS});
                    break;
                case 'ACTION_REJECTED':
                    break;
                default:
                    console.warn(e)
            }
        } finally {
            setActionsEnabled(true)
        }
    }

    useEffect(() => {
        void fetchData()
    }, [])

    return (
        <>
            <LModal isOpen={isOpen} setIsOpen={setIsOpen}>
                <HeadlessUIDialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 break-all"
                >
                    Managing Lottery: <p>{address}</p>
                </HeadlessUIDialog.Title>
                <hr className={"w-full my-4"}/>
                {loading

                    ? (<div className={"flex justify-center items-center p-8"}>
                        <MagnifyingGlassCircleIcon className="text-indigo-900 h-12 w-12 animate-pulse"/>
                    </div>)
                    : (
                    <div className={"my-4"}>
                        <h3 className={"font-bold mb-2"}>Information</h3>
                        <p><b className={"font-semibold"}>Players: </b>{lotteryInfo.players?.length}</p>
                        <p><b className={"font-semibold"}>Balance: </b>{lotteryInfo.balance} ETH</p>
                        <p><b className={"font-semibold"}>Ticket price: </b>{lotteryInfo.ticketPrice} ETH</p>
                        <p><b className={"font-semibold"}>Purchasable: </b>{lotteryInfo.purchasable ? 'On' : 'Off'}</p>
                        {lotteryInfo.winner !== EMPTY_ADDRESS &&
                          <p className={"break-all"}>
                            <b className={"font-semibold"}>Last winner: </b>
                              {lotteryInfo.winner}
                          </p>
                        }
                        <hr className={"w-full my-4"}/>
                        <h3 className={"font-bold mb-2"}>Actions</h3>
                        <div className={"flex flex-wrap gap-4"}>
                            <div className={"basis-full flex justify-between gap-2"}>
                                <div>
                                    <label className="mb-1 text-left block text-sm font-medium">
                                        Set Purchasable: {purchasable ? 'On' : 'Off'}
                                    </label>
                                    <LSwitch purchasable={purchasable} setPurchasable={setPurchasable}/>
                                </div>
                                <button onClick={onSetPurchasable}
                                        disabled={!actionsEnabled}
                                        className="w-[100px] font-bold text-sm inline-block text-indigo-500 ring-2 ring-indigo-500 p-2 rounded-md hover:bg-indigo-500 hover:text-white disabled:bg-gray-400 disabled:text-white disabled:ring-gray-400">
                                    Confirm Purchasable
                                </button>
                            </div>
                            <div className={"basis-full flex justify-between gap-2"}>
                                <div>
                                    <label className="mb-1 text-left block text-sm font-medium">
                                        Set Ticket price:
                                    </label>
                                    <LInput value={ticketPrice}
                                            setValue={setTicketPrice}
                                            disabled={!!lotteryInfo.players?.length || !actionsEnabled}
                                    />
                                </div>
                                <button onClick={onSetTicketPrice}
                                        disabled={!!lotteryInfo.players?.length || !actionsEnabled}
                                        className="w-[100px] font-bold text-sm inline-block text-indigo-500 ring-2 ring-indigo-500 p-2 rounded-md hover:bg-indigo-500 hover:text-white disabled:bg-gray-400 disabled:text-white disabled:ring-gray-400">
                                    Confirm Ticket price
                                </button>
                            </div>
                            <div className={"basis-full flex justify-between items-center"}>
                                <button onClick={onPickWinner}
                                        disabled={!lotteryInfo.players?.length || !actionsEnabled}
                                        className="w-full py-4 font-bold text-sm inline-block text-amber-500 ring-2 ring-amber-500 p-2 rounded-md hover:bg-amber-500 hover:text-white disabled:bg-gray-400 disabled:text-white disabled:ring-gray-400">
                                    Pick a Winner
                                </button>
                            </div>
                        </div>
                    </div>)
                }

                <div className="mt-6">
                    <button type="button"
                            className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-md font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                            onClick={() => setIsOpen(false)}
                    >
                        Close
                    </button>
                </div>
            </LModal>
        </>
    )
}
