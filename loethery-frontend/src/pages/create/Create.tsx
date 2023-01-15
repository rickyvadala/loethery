import {Logo} from "../../components/atoms/logo/Logo";
import etherCoin from "../../assets/img/ether-coin.png";
import React from "react";
import {Action} from "../../components/atoms/action/Action";
import {useContract} from "../../providers/ContractProvider";
import {useOutletContext} from "react-router-dom";

export const Create = () => {
    const {deployService} = useContract()
    const [setLoading] = useOutletContext<any>();

    const deploy = async () => {
        try {
            setLoading(true)
            const deployed = await deployService.onDeploy('0.02', true)
            alert(deployed.contractAddress)
        } catch (e) {
            console.log(e)
        } finally {
            setLoading(false)
        }
    }
    return (
        <div
            className="columns-2 gap-2 flex justify-center items-center min-h-[calc(100vh-2.5rem)] p-8 pt-24">
            <div className="text-center z-10 text-xl text-white">
                <h1 className="text-6xl md:text-7xl lg:text-8xl drop-shadow-2xl">
                    <Logo/>
                </h1>
                <h5 className="mt-8 flex flex-col items-start">
                    <code>1. Create your own lottery</code>
                    <code>2. Share it with anybody</code>
                    <code>3. Play with you friends</code>
                </h5>
                <div className="mt-8">
                    <Action onClick={deploy} label={'Create!'}/>
                </div>
            </div>
            <div className="max-w-md min-w-sm absolute sm:relative opacity-20 sm:opacity-90">
                <img src={etherCoin} alt="ethereum coin" className="drop-shadow-2xl"/>
            </div>
        </div>
    );
}
