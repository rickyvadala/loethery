import React, {useEffect, useState} from "react";
import lottery from "../../web3/lottery";
import {ethers} from "ethers";
import {useMetaMaskAccount} from "../../providers/MetaMaskProvider";
import Logo from "../../components/atoms/logo/Logo";

const Play = () => {
    const VALUE = '0.02'
    const [loading, setLoading] = useState<boolean>(true)
    const [players, setPlayers] = useState<Array<any>>([])
    const [manager, setManager] = useState<string>('')
    const [winner, setWinner] = useState<string>('')
    const [balance, setBalance] = useState<string>('')
    const {ethereum, connectedAccount} = useMetaMaskAccount()


    const fetchManager = async () => setManager(await lottery.methods.manager().call())
    const fetchPlayers = async () => setPlayers(await lottery.methods.getPlayers().call())
    const fetchWinner = async () => setWinner(await lottery.methods.winner().call())
    const fetchLotteryBalance = async () => {
        const provider = new ethers.providers.Web3Provider(ethereum)
        const lotteryBalance = await provider.getBalance(lottery.options.address)
        setBalance(ethers.utils.formatEther(lotteryBalance))
    }

    useEffect(() => {
        if (ethereum) {
            Promise.all([fetchWinner(), fetchManager(), fetchPlayers(), fetchLotteryBalance()])
                .finally(() => setLoading(false))
        }
    }, [ethereum]);

    const onSubmit = async (event: React.SyntheticEvent) => {
        try {
            setLoading(true)
            event.preventDefault()
            await lottery.methods.enter().send({from: connectedAccount, value: ethers.utils.parseUnits(VALUE, 'ether')})
            await Promise.all([fetchLotteryBalance(), fetchPlayers()])
        } catch (e: any) {
            alert(e.message)
        } finally {
            setLoading(false)
        }
    }

    const onPickWinner = async () => {
        try {
            setLoading(true)
            await lottery.methods.pickWinner().send({from: connectedAccount})
            await Promise.all([fetchLotteryBalance(), fetchPlayers(), fetchWinner()])
        } catch (e: any) {
            alert(e.message)
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="min-h-screen px-8 pt-24 pb-8 flex flex-wrap justify-center">
            <h1 className="text-5xl sm:text-7xl lg:text-8xl drop-shadow-2xl w-full flex items-center justify-center">
                <Logo/>
            </h1>
            <div className="text-xl sm:text-2xl text-white flex flex-wrap gap-8 max-w-xl">
                {players.length &&
                  <div>
                    <p className="mb-2">There are currently {players.length} people competing to win:</p>
                    <p className="text-4xl font-bold">{balance} ether!</p>
                  </div>
                }
                <a onClick={onSubmit}
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
            </div>

            {connectedAccount === manager && (
                <>
                    <h4>Pick a winner!</h4>
                    <button onClick={onPickWinner}>Start</button>
                </>
            )}
        </div>
    );
}

export default Play;
