import {NavigateFunction, useNavigate} from "react-router-dom";
import {Logo} from "../../components/atoms/logo/Logo";
import etherCoin from "../../assets/img/ether-coin.png";
import React from "react";

export const Connect = () => {
    const navigate: NavigateFunction = useNavigate();
    return (
        <div
            className="columns-2 gap-2 flex justify-center items-center min-h-screen p-8 pt-24">
            <div className="text-center z-10">
                <h1 className="text-6xl md:text-7xl lg:text-8xl drop-shadow-2xl">
                    <Logo/>
                </h1>
                <h5 className="mt-8 text-xl text-white">
                    <code>The decentralized lottery</code>
                </h5>
                <div className="mt-16">
                    <a onClick={() => navigate('/play')}
                       className="cursor-pointer text-xl drop-shadow-2xl rounded-lg bg-amber-500 p-8 font-bold text-white shadow-sm ring-1 ring-amber-500 hover:bg-amber-400 hover:ring-amber-400"
                    >
                        <code>Try your luck!</code>
                    </a>
                </div>
            </div>
            <div className="max-w-md min-w-sm absolute sm:relative opacity-20 sm:opacity-90">
                <img src={etherCoin} alt="ethereum coin" className="drop-shadow-2xl"/>
            </div>
        </div>
    );
}
