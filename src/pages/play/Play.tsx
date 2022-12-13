import logo from '../../assets/img/react.svg';
import etherCoin from '../../assets/img/ether-coin.png';
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
        <div className="play">
            <div className="columns-2 gap-2 bg-gradient-to-r from-indigo-800 to-[#910572] p-8 flex min-h-screen justify-center items-center">
                <div className=" text-center ">
                    <h1 className="text-6xl md:text-8xl drop-shadow-2xl">
                        <Logo/>
                    </h1>
                    <h5 className="mt-8 text-xl text-white">
                        <code>The decentralized lottery</code>
                    </h5>
                    <div className="mt-16">
                        <a href="#"
                           className="drop-shadow-2xl rounded-lg bg-amber-600 p-8 font-bold text-white shadow-sm ring-1 ring-amber-600 hover:bg-amber-500 hover:ring-amber-500"
                        >
                            <code>Play now!</code>
                        </a>
                    </div>
                </div>
                <div className="max-w-lg min-w-sm">
                    <img src={etherCoin} alt="ethereum coin" className="drop-shadow-2xl"/>
                </div>
            </div>
            <div className="bg-gradient-to-l from-indigo-900 to-[#910572]">


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
        </div>
    );
}

export default Play;
