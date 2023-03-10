import {NavigateFunction, useNavigate} from "react-router-dom";
import {Logo} from "../../components/atoms/logo/Logo";
import etherCoin from "../../assets/img/ether-coin.png";
import React from "react";
import {Action} from "../../components/atoms/action/Action";

export const Home = () => {
    const navigate: NavigateFunction = useNavigate();
    return (
        <div
            className="columns-2 gap-2 flex justify-center items-center min-h-[calc(100vh-2.5rem)] p-8 pt-24">
            <div className="text-center z-10 text-xl text-white">
                <h1 className="text-6xl md:text-7xl lg:text-8xl drop-shadow-2xl cursor-default">
                    <Logo/>
                </h1>
                <h5 className="mt-8">
                    <code>The decentralized lottery</code>
                </h5>
                <div className="mt-8">
                    <Action onClick={() => navigate('/play')} label={'Try your luck!'}/>
                </div>
            </div>
            <div className="max-w-md min-w-sm absolute sm:relative opacity-20 sm:opacity-90">
                <img src={etherCoin} alt="ethereum coin" className="drop-shadow-2xl"/>
            </div>
        </div>
    );
}
