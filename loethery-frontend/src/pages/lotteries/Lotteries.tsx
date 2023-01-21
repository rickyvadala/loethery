import {Logo} from "../../components/atoms/logo/Logo";
import React, {useEffect, useState} from "react";
import {useMetaMaskAccount} from "../../providers/MetaMaskProvider";
import {fetchLotteries} from "../../services/firestore.service";
import {NavigateFunction, useNavigate} from "react-router-dom";
import {FaceFrownIcon,MagnifyingGlassCircleIcon} from "@heroicons/react/24/outline";
import {Action} from "../../components/atoms/action/Action";


export const Lotteries = () => {
    const navigate: NavigateFunction = useNavigate();

    const {accountConnected} = useMetaMaskAccount()
    const [tableLoader, setTableLoader] = useState<boolean>(true)
    const [lotteries, setLotteries] = useState<any>([])

    const getLotteries = async () => {
        setTableLoader(true)
        setLotteries(await fetchLotteries(accountConnected))
        setTableLoader(false)
    }

    useEffect(() => {
        accountConnected && void getLotteries()
    }, [accountConnected])

    return (
        <div
            className="flex justify-center items-center min-h-[calc(100vh-2.5rem)] p-8 pt-24">
            <div className="text-center z-10 text-xl text-white">
                <h1 className="text-6xl drop-shadow-2xl cursor-default">
                    <Logo/>
                </h1>
                <h5 className="mt-8">
                    <code>My Lotteries</code>
                </h5>

                <div className="w-full max-w-[90vw] min-w-[50vw]">
                    <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
                        <div className="pt-2 inline-block min-w-full sm:px-6 lg:px-8">
                            <div className="overflow-hidden">
                                <table className="min-w-full">
                                    <thead className="bg-indigo-800 border-b">
                                    <tr>
                                        <th scope="col"
                                            className="text-sm font-medium text-white px-6 py-4 text-left">
                                            Address
                                        </th>
                                        <th scope="col"
                                            className="text-sm font-medium text-white px-6 py-4 text-left">
                                            Actions
                                        </th>
                                    </tr>
                                    </thead>
                                    <tbody className={'w-full relative'}>
                                    {(tableLoader || lotteries.length === 0) &&
                                      <tr className="h-24 bg-white">
                                        <td>
                                          <span
                                            className={"left-[calc(50%-1.5rem)] top-[calc(50%-1.5rem)] absolute text-black"}>
                                            {tableLoader
                                                ? <MagnifyingGlassCircleIcon className="h-12 w-12"/>
                                                : <FaceFrownIcon className="h-12 w-12"/>
                                            }
                                          </span>
                                        </td>
                                        <td/>
                                      </tr>
                                    }
                                    {lotteries.map(address => (
                                        <tr key={address}
                                            className="bg-white border-b transition duration-300 ease-in-out hover:bg-gray-100">
                                            <td className="text-left text-bold px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                                {address}
                                            </td>
                                            <td className="text-sm text-gray-900 font-light p-2 whitespace-nowrap flex gap-2">
                                                <a className="text-white bg-indigo-500 p-2 rounded-md hover:bg-indigo-600"
                                                   target="_blank"
                                                   href={`https://goerli.etherscan.io/address/${address}`}>
                                                    Etherscan
                                                </a>
                                                <button
                                                    className="text-white bg-amber-500 p-2 rounded-md hover:bg-amber-600">
                                                    Manage
                                                </button>
                                                <button onClick={() => navigate(`/play/${address}`)}
                                                        className="text-white bg-amber-500 p-2 rounded-md hover:bg-amber-600">
                                                    Play
                                                </button>
                                                <button
                                                    onClick={() => navigator.clipboard.writeText(`${window.location.origin}/play/${address}`)}
                                                    className="text-white bg-amber-500 p-2 rounded-md hover:bg-amber-600">
                                                    Share
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
                {lotteries.length === 0 && !tableLoader && (
                    <div className={"flex flex-col gap-4 pt-4"}>
                        <h2>No lotteries found...</h2>
                        <div className={"flex flex-row gap-4"}>
                            <Action onClick={() => navigate('/play')} label={'Play now!'}/>
                            <Action onClick={() => navigate('/create')} label={'Create one!'}/>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
