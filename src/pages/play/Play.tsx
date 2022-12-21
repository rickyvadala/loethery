import React, {useEffect, useState} from "react";
import {ethers} from "ethers";
import {useMetaMaskAccount} from "../../providers/MetaMaskProvider";
import {Logo} from "../../components/atoms/logo/Logo";
import {useContract} from "../../providers/ContractProvider";
import {useOutletContext} from "react-router-dom";
import {Action} from "../../components/atoms/action/Action";

export const Play = () => {
    const [players, setPlayers] = useState<Array<any>>([])
    const [manager, setManager] = useState<string>('0x0000000000000000000000000000000000000000')
    const [winner, setWinner] = useState<string>('0x0000000000000000000000000000000000000000')
    const [balance, setBalance] = useState<string>('0')

    const [setLoading, setProgressLoading, disabled] = useOutletContext<any>();
    const {accountConnected, web3Provider, chainValid} = useMetaMaskAccount();
    const {contract} = useContract();
    const value = ethers.utils.parseUnits('0.02', 'ether')

    const fetchManager = async () => setManager(await contract?.manager())
    const fetchPlayers = async () => setPlayers(await contract?.getPlayers())
    const fetchWinner = async () => setWinner(await contract?.winner())
    const fetchLotteryBalance = async () => {
        if (web3Provider && contract) {
            setBalance(ethers.utils.formatEther(await web3Provider.getBalance(contract.address)))
        }
    }

    useEffect(() => {
        if (contract && chainValid) {
            setLoading(true)
            Promise.all([fetchWinner(), fetchManager(), fetchPlayers(), fetchLotteryBalance()])
                .finally(() => setLoading(false))
        }
    }, [contract, accountConnected]);

    const onTransaction = async (name: string, params: {}) => {
        if (web3Provider && accountConnected) {
            try {
                setLoading(true)
                const transaction = await contract?.connect(web3Provider.getSigner())[name](params)
                setLoading(false)
                setProgressLoading(true)
                await transaction.wait()
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
            <div className={`text-xl sm:text-2xl text-white flex flex-wrap gap-8 max-w-xl`}>
                {!!players.length &&
                  <div>
                    <p className="mb-2">There are currently {players.length} people competing to win:</p>
                    <p className="text-4xl font-bold">{balance} ether!</p>
                  </div>
                }
                <Action disabled={disabled}
                        onClick={() => onTransaction('enter', {from: accountConnected, value})}
                        label={'Play now!'}/>
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

                {Number(accountConnected) === Number(manager) && (
                    <>
                        <hr className={"w-full"}/>
                        <p className={"mb-2"}>Pick a winner!</p>
                        <Action disabled={disabled}
                                onClick={() => onTransaction('pickWinner', {from: accountConnected})}
                                label={'Start'}
                        />
                    </>
                )}
            </div>
        </div>
    );
}
