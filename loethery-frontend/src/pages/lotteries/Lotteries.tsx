import {Logo} from "../../components/atoms/logo/Logo";
import React, {useEffect, useState} from "react";
import {useMetaMaskAccount} from "../../providers/MetaMaskProvider";
import {fetchLotteries} from "../../services/firestore.service";
import {NavigateFunction, useNavigate} from "react-router-dom";
import {Cog6ToothIcon, FaceFrownIcon, MagnifyingGlassCircleIcon, ShareIcon} from "@heroicons/react/24/outline";
import {Action} from "../../components/atoms/action/Action";
import {ManageLotteryModal} from "../../features/lotteries/manage-lottery-modal/ManageLotteryModal";


export const Lotteries = () => {
    const navigate: NavigateFunction = useNavigate();

    const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
    const [selectedLottery, setSelectedLottery] = useState<string>('')
    const {accountConnected, web3Enabled} = useMetaMaskAccount()
    const [tableLoader, setTableLoader] = useState<boolean>(true)
    const [lotteries, setLotteries] = useState<any>([])

    const getLotteries = async () => {
        setTableLoader(true)
        setLotteries(await fetchLotteries(accountConnected))
        setTableLoader(false)
    }

    const manageLottery = (address: string) => {
        setSelectedLottery(address)
        setIsModalOpen(true)
    }

    useEffect(() => {
        accountConnected && void getLotteries()
    }, [accountConnected])

    return (
        <>
            <div
                className="flex justify-center items-center min-h-[calc(100vh-2.5rem)] p-8 pt-24">
                <div className="text-center z-10 text-xl text-white">
                    <h1 className="text-6xl drop-shadow-2xl cursor-default">
                        <Logo/>
                    </h1>
                    <h5 className="pt-8 pb-4">
                        <code>My Lotteries</code>
                    </h5>

                    <div className="w-full max-w-[90vw] min-w-[90vw] md:min-w-[50vw]">
                        <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
                            <div className="inline-block min-w-full sm:px-6 lg:px-8">
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
                                                ? <MagnifyingGlassCircleIcon className="text-indigo-900 h-12 w-12 animate-pulse"/>
                                                : <FaceFrownIcon className="text-indigo-900 h-12 w-12"/>
                                            }
                                          </span>
                                            </td>
                                            <td/>
                                          </tr>
                                        }
                                        {lotteries.map(address => (
                                            <tr key={address}
                                                className="bg-white border-b transition duration-300 ease-in-out hover:bg-gray-100">
                                                <td className="text-left text-bold p-2 whitespace-nowrap text-sm font-medium pl-4">
                                                    <button onClick={() => navigate(`/play/${address}`)}
                                                            className="inline-block text-white bg-amber-500 p-2 mr-2 rounded-md hover:bg-amber-600">
                                                        Play
                                                    </button>
                                                    <a className="hover:underline inline-block text-black"
                                                       target="_blank"
                                                       href={`https://goerli.etherscan.io/address/${address}`}>
                                                        {address}
                                                    </a>
                                                </td>
                                                <td className="text-sm p-2 whitespace-nowrap flex gap-2 text-white pr-4">
                                                    <button onClick={() => manageLottery(address)}
                                                            className="flex justify-center items-center gap-1 bg-indigo-500 p-2 rounded-md hover:bg-indigo-600">
                                                        <Cog6ToothIcon className="h-6 w-6"/>
                                                        Manage
                                                    </button>
                                                    <button
                                                        onClick={() => navigator.clipboard.writeText(`${window.location.origin}/play/${address}`)}
                                                        className="flex justify-center items-center gap-1 bg-amber-500 p-2 rounded-md hover:bg-amber-600">
                                                        <ShareIcon className="h-5 w-5"/>
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
            {isModalOpen && web3Enabled &&
              <ManageLotteryModal isOpen={isModalOpen} setIsOpen={setIsModalOpen} address={selectedLottery}/>
            }
        </>
    );
}
