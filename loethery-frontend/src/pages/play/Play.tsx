import React, {useEffect, useState} from "react";
import {useMetaMaskAccount} from "../../providers/MetaMaskProvider";
import {Logo} from "../../components/atoms/logo/Logo";
import {useOutletContext, useParams} from "react-router-dom";
import {Action} from "../../components/atoms/action/Action";
import {useContract} from "../../providers/ContractProvider";
import {dialogMessages} from "../../utils/constants";

const EMPTY_ADDRESS = '0x0000000000000000000000000000000000000000';

export const Play = () => {
    const [players, setPlayers] = useState<Array<any>>([])
    const [manager, setManager] = useState<string>(EMPTY_ADDRESS)
    const [winner, setWinner] = useState<string>(EMPTY_ADDRESS)
    const [ticketPrice, setTicketPrice] = useState<string>('')
    const [balance, setBalance] = useState<string>('0')

    const [setLoading, setProgressLoading, openDialog, disabled] = useOutletContext<any>();
    const {accountConnected, web3Enabled} = useMetaMaskAccount();
    const {lotteryServiceFactory} = useContract()
    const {address} = useParams()

    const fetchData = async () => {
        const service = lotteryServiceFactory(address)
        try {
            setLoading(true)
            const [_ticketPrice, _winner, _manager, _players, _balance] = await Promise.all([
                service.fetchTicketPrice(),
                service.fetchWinner(),
                service.fetchManager(),
                service.fetchPlayers(),
                service.fetchLotteryBalance(),
            ])
            setTicketPrice(_ticketPrice)
            setWinner(_winner)
            setManager(_manager)
            setPlayers(_players)
            setBalance(_balance)
        } catch (e) {
            console.warn(e)
        } finally {
            setLoading(false)
        }
    }


    useEffect(() => {
        if (web3Enabled) {
            void fetchData()
        }
    }, [web3Enabled, address]);

    const onPurchase = () => void onTransaction('onPurchase', ticketPrice)
    const onPickWinner = () => void onTransaction('onPickWinner')
    const onTransaction = async (method: string, value?: string) => {
        try {
            setLoading(true)
            const transaction = await lotteryServiceFactory(address)[method](value)
            setLoading(false)
            setProgressLoading(true)
            await transaction.wait()
            await fetchData()
        } catch (e: any) {
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
            setLoading(false)
            setProgressLoading(false)
        }
    }

    return (
        <div className="min-h-[calc(100vh-2.5rem)] px-8 pt-24 pb-16 flex flex-wrap justify-center">
            <h1 className="cursor-default my-12 text-5xl sm:text-7xl lg:text-8xl drop-shadow-2xl w-full flex items-center justify-center">
                <Logo/>
            </h1>
            <div className={`text-xl sm:text-2xl text-white flex flex-wrap gap-8 max-w-xl`}>
                {!!players.length &&
                  <div>
                    <p className="mb-2">There are currently {players.length} people competing to win:</p>
                    <p className="text-4xl font-bold">{balance} ether!</p>
                  </div>
                }
                <div className={"w-full"}>
                    <Action disabled={disabled} onClick={onPurchase} label={`Play now!`}/>
                    <code className={"text-md"}><b>Ticket price:</b> {ticketPrice} ethers</code>
                </div>
                <hr className={"w-full"}/>
                {winner !== EMPTY_ADDRESS &&
                  <div className={"break-all"}>
                    <p className={"mb-2"}>The last winner was:</p>
                    <p>{winner}</p>
                  </div>
                }
                <div className={"break-all"}>
                    <p className={"mb-2"}>This contract is managed by:</p>
                    <p>{manager}</p>
                </div>

                {Number(accountConnected) === Number(manager) && (
                    <>
                        <hr className={"w-full"}/>
                        <p className={"mb-2"}>Pick a winner!</p>
                        <Action disabled={disabled} onClick={onPickWinner} label={'Start'}/>
                    </>
                )}
            </div>
        </div>
    );
}
