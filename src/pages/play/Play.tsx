import React, {useEffect, useState} from "react";
import {ethers} from "ethers";
import {useMetaMaskAccount} from "../../providers/MetaMaskProvider";
import {Logo} from "../../components/atoms/logo/Logo";
import {useContract} from "../../providers/ContractProvider";
import {useOutletContext} from "react-router-dom";

export const Play = () => {
    const VALUE = '0.02'
    const [players, setPlayers] = useState<Array<any>>([])
    const [manager, setManager] = useState<string>('')
    const [winner, setWinner] = useState<string>('')
    const [balance, setBalance] = useState<string>('')
    const [setLoading, setProgressLoading] = useOutletContext<any>();

    const {connectedAccount, web3Provider} = useMetaMaskAccount();
    const {contract} = useContract();

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
        if (web3Provider) {
            try {
                setLoading(true)
                const enter = await contract?.connect(web3Provider.getSigner()).enter({
                    from: connectedAccount,
                    value: ethers.utils.parseUnits(VALUE, 'ether')
                })
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
        }
    }

    const onPickWinner = async () => {
        if (web3Provider) {
            try {
                setLoading(true)
                const pickWinner = await contract?.connect(web3Provider.getSigner()).pickWinner({from: connectedAccount})
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
                <a onClick={onPlay}
                   className="w-full flex items-center cursor-pointer justify-center drop-shadow-2xl rounded-lg bg-amber-500 p-6 font-bold text-white shadow-sm ring-1 ring-amber-500 hover:bg-amber-400 hover:ring-amber-400"
                >
                    <code>Play now!</code>
                </a>
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

                {Number(connectedAccount) === Number(manager) && (
                    <>
                        <hr className={"w-full"}/>
                        <p className={"mb-2"}>Pick a winner!</p>
                        <a onClick={onPickWinner}
                           className="w-full flex items-center cursor-pointer justify-center drop-shadow-2xl rounded-lg bg-amber-500 p-6 font-bold text-white shadow-sm ring-1 ring-amber-500 hover:bg-amber-400 hover:ring-amber-400"
                        >
                            <code>Start</code>
                        </a>
                    </>
                )}
            </div>
        </div>
    );
}
