import logo from '../../assets/img/react.svg';
import React, {useEffect, useState} from "react";
import web3 from '../../web3/web3'
import lottery from "../../web3/lottery";
import Logo from "../../components/atoms/logo/Logo";

const Play = () => {
    const [loading, setLoading] = useState<boolean>(true)
    const [accounts, setAccounts] = useState<Array<any>>([])
    const [players, setPlayers] = useState<Array<any>>([])
    const [manager, setManager] = useState<string>('')
    const [winner, setWinner] = useState<string>('')
    const [balance, setBalance] = useState<string>('')
    const [value, setValue] = useState<string>('')

    const fetchManager = async () => setManager(await lottery.methods.manager().call())
    const fetchPlayers = async () => setPlayers(await lottery.methods.getPlayers().call())
    const fetchWinner = async () => setWinner(await lottery.methods.winner().call())
    const fetchBalance = async () => setBalance(await web3.eth.getBalance(lottery.options.address))
    const fetchAccounts = async () => setAccounts(await web3.eth.getAccounts())

    useEffect(() => {
        Promise.all([fetchWinner(), fetchAccounts(), fetchManager(), fetchPlayers(), fetchBalance()])
            .finally(() => setLoading(false))
    }, []);

    const onSubmit = async (event: React.SyntheticEvent) => {
        try {
            setLoading(true)
            event.preventDefault()
            await lottery.methods.enter().send({from: accounts[0], value: web3.utils.toWei(value, 'ether')})
            await Promise.all([fetchBalance(), fetchPlayers()])
        } catch (e: any) {
            alert(e.message)
        } finally {
            setLoading(false)
        }
    }

    const onPickWinner = async () => {
        try {
            setLoading(true)
            await lottery.methods.pickWinner().send({from: accounts[0]})
            await Promise.all([fetchBalance(), fetchPlayers(), fetchWinner()])
        } catch (e: any) {
            alert(e.message)
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="App">
            <div className="relative px-6 lg:px-8">
                <div className="mx-auto max-w-3xl pt-20 pb-32 sm:pt-48 sm:pb-40">
                    <div>
                        <div>
                            <h1 className="text-6xl sm:text-center sm:text-8xl">
                                <Logo />
                            </h1>
                            <h5 className="mt-8 text-xl leading-8 text-white sm:text-center">
                                The decentralized lottery
                            </h5>
                            <div className="mt-8 flex gap-x-4 sm:justify-center">
                                <a
                                    href="#"
                                    className="rounded-lg bg-amber-600 px-8 py-8 font-bold text-white shadow-sm ring-1 ring-amber-600 hover:bg-amber-500 hover:ring-amber-500"
                                >
                                    Play now!
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {loading && <img src={logo} className="logo" alt="logo"/>}
            <h2>Lottery Contract</h2>
            <p>This contract is managed by {manager}.</p>
            {winner && <p>The last winner was: {winner}</p>}
            <p>There are currently {players.length} people competing to
                win {web3.utils.fromWei(balance, 'ether')} ether!</p>

            <hr/>

            <form onSubmit={onSubmit}>
                <h4>Want to try your luck?</h4>
                <div style={{display: "flex", flexDirection: "column", maxWidth: 320, margin: "auto"}}>
                    <label>Amount of ether to enter</label>
                    <input type="number"
                           value={value}
                           onChange={event => setValue(event.target.value)}
                    />
                </div>
                <button type="submit">Enter</button>
            </form>

            <hr/>
            {accounts[0] === manager && (<>
                <h4>Pick a winner!</h4>
                <button onClick={onPickWinner}>Start</button>
            </>)}
        </div>
    );
}

export default Play;
