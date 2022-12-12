import "./App.css";
import logo from './assets/react.svg';
import React, {FormEventHandler, useEffect, useState} from "react";
import web3 from './web3/web3'
import lottery from "./web3/lottery";

const App = () => {
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

    useEffect(() => {
        Promise.all([fetchWinner(), fetchAccounts(), fetchManager(), fetchPlayers(), fetchBalance()])
            .finally(() => setLoading(false))
    }, []);

    return (
        <div className="App">
            <header className="App-header">
                {loading && <img src={logo} className="App-logo" alt="logo"/>}
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
            </header>
        </div>
    );
}

export default App;
