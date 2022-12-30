import React, {useEffect, useState} from "react";
import {useMetaMaskAccount} from "../../providers/MetaMaskProvider";
import {Logo} from "../../components/atoms/logo/Logo";
import {useOutletContext} from "react-router-dom";
import {Action} from "../../components/atoms/action/Action";
import {TransactionParams} from "../../services/contract.service";
import {useContract} from "../../providers/ContractProvider";

const EMPTY_ADDRESS = '0x0000000000000000000000000000000000000000';

export const Play = () => {
    const [players, setPlayers] = useState<Array<any>>([])
    const [manager, setManager] = useState<string>(EMPTY_ADDRESS)
    const [winner, setWinner] = useState<string>(EMPTY_ADDRESS)
    const [ticketPrice, setTicketPrice] = useState<string>('')
    const [balance, setBalance] = useState<string>('0')

    const [setLoading, setProgressLoading, disabled] = useOutletContext<any>();
    const {accountConnected, chainValid} = useMetaMaskAccount();
    const {contractService} = useContract()

    const fetchData = async () => {
        const [_ticketPrice, _winner, _manager, _players, _balance] = await Promise.all([
            contractService.fetchTicketPrice(),
            contractService.fetchWinner(),
            contractService.fetchManager(),
            contractService.fetchPlayers(),
            contractService.fetchLotteryBalance(),
        ])
        setTicketPrice(_ticketPrice)
        setWinner(_winner)
        setManager(_manager)
        setPlayers(_players)
        setBalance(_balance)
    }

    useEffect(() => {
        if (contractService && chainValid) {
            setLoading(true)
            fetchData().finally(setLoading(false))
        }
    }, [contractService, accountConnected, chainValid]);

    const onPurchase = () => {
        void onTransaction('onPurchase', {from: accountConnected, value: ticketPrice})
    }
    const onPickWinner = () => {
        void onTransaction('onPickWinner', {from: accountConnected})
    }
    const onTransaction = async (method: string, params: TransactionParams) => {
        try {
            setLoading(true)
            const transaction = await contractService[method](params)
            setLoading(false)
            setProgressLoading(true)
            await transaction.wait()
            await fetchData()
        } catch (e: any) {
            alert(e.message)
        } finally {
            setLoading(false)
            setProgressLoading(false)
        }
    }

    return (
        <div className="min-h-[calc(100vh-2.5rem)] px-8 pt-24 pb-16 flex flex-wrap justify-center">
            <h1 className="my-12 text-5xl sm:text-7xl lg:text-8xl drop-shadow-2xl w-full flex items-center justify-center">
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
