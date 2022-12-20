import React, {useEffect, useState} from "react";
import {ethers} from "ethers";
import {useMetaMaskAccount} from "../../providers/MetaMaskProvider";
import {Logo} from "../../components/atoms/logo/Logo";
import {useContract} from "../../providers/ContractProvider";
import {useOutletContext} from "react-router-dom";
import {Action} from "../../components/atoms/action/Action";
import {Dialog, DialogType} from "../../components/atoms/dialog/Dialog";

export const Play = () => {
    const value = ethers.utils.parseUnits('0.02', 'ether')
    const [players, setPlayers] = useState<Array<any>>([])
    const [manager, setManager] = useState<string>('0x0000000000000000000000000000000000000000')
    const [winner, setWinner] = useState<string>('0x0000000000000000000000000000000000000000')
    const [balance, setBalance] = useState<string>('0')

    const [setLoading, progressLoading, setProgressLoading] = useOutletContext<any>();
    const {ethereum, accountConnected: from, web3Provider} = useMetaMaskAccount();
    const {contract} = useContract();

    const [isOpen, setIsOpen] = useState<boolean>(false)
    const [dialog, setDialog] = useState<DialogType>({isOpen, setIsOpen, timeout: 3000, closeOnBlur: true})
    const openDialog = (message: Array<any>, title: string) => {
        setIsOpen(true)
        setDialog((prevState: DialogType) => ({...prevState, message, title}))
    }

    const fetchManager = async () => setManager(await contract?.manager())
    const fetchPlayers = async () => setPlayers(await contract?.getPlayers())
    const fetchWinner = async () => setWinner(await contract?.winner())
    const fetchLotteryBalance = async () => {
        if (web3Provider && contract) {
            setBalance(ethers.utils.formatEther(await web3Provider.getBalance(contract.address)))
        }
    }

    useEffect(() => {
        if (contract) {
            setLoading(true)
            Promise.all([fetchWinner(), fetchManager(), fetchPlayers(), fetchLotteryBalance()])
                .finally(() => setLoading(false))
        }
    }, [contract]);

    const onPlay = async () => {
        if (web3Provider && from) {
            try {
                setLoading(true)
                const enter = await contract?.connect(web3Provider.getSigner()).enter({from, value})
                setLoading(false)
                setProgressLoading(true)
                await enter.wait()
                await Promise.all([fetchLotteryBalance(), fetchPlayers()])
            } catch ({message}) {
                alert(message)
            } finally {
                setLoading(false)
                setProgressLoading(false)
            }
        } else {

        }
    }

    const onPickWinner = async () => {
        if (web3Provider && from) {
            try {
                setLoading(true)
                const pickWinner = await contract?.connect(web3Provider.getSigner()).pickWinner({from})
                setLoading(false)
                setProgressLoading(true)
                await pickWinner.wait()
                await Promise.all([fetchLotteryBalance(), fetchPlayers(), fetchWinner()])
            } catch (e: any) {
                alert(e.message)
            } finally {
                setLoading(false)
                setProgressLoading(false)
            }
        } else {

        }
    }

    return (
        <div className="min-h-screen px-8 pt-24 pb-8 flex flex-wrap justify-center">
            <h1 className="my-12 text-5xl sm:text-7xl lg:text-8xl drop-shadow-2xl w-full flex items-center justify-center">
                <Logo/>
            </h1>
            <div className="text-xl sm:text-2xl text-white flex flex-wrap gap-8 max-w-xl">
                {!!players.length &&
                  <div>
                    <p className="mb-2">There are currently {players.length} people competing to win:</p>
                    <p className="text-4xl font-bold">{balance} ether!</p>
                  </div>
                }
                <Action disabled={progressLoading} onClick={onPlay} label={'Play now!'}/>
                {winner &&
                  <div className={"break-all"}>
                    <p className={"mb-2"}>The last winner was:</p>
                    <p>{winner}</p>
                  </div>
                }
                <div className={"break-all"}>
                    <p className={"mb-2"}>This contract is managed by:</p>
                    <p>{manager}</p>
                </div>

                {Number(from) === Number(manager) && (
                    <>
                        <hr className={"w-full"}/>
                        <p className={"mb-2"}>Pick a winner!</p>
                        <Action disabled={progressLoading} onClick={onPickWinner} label={'Start'}/>
                    </>
                )}
            </div>
            <Dialog {...dialog}/>
        </div>
    );
}
