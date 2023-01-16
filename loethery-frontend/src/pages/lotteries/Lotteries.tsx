import {Logo} from "../../components/atoms/logo/Logo";
import React, {useEffect, useState} from "react";
import {useMetaMaskAccount} from "../../providers/MetaMaskProvider";
import {fetchLotteries} from "../../services/firestore.service";

export const Lotteries = () => {
    const {accountConnected, web3Enabled} = useMetaMaskAccount()
    const [tableLoader, setTableLoader] = useState<boolean>(false)
    const [lotteries, setLotteries] = useState<any>([])

    const getLotteries = async () => {
        setTableLoader(true)
        setLotteries(await fetchLotteries(accountConnected))
        setTableLoader(false)
    }

    useEffect(() => {
        if (accountConnected && web3Enabled) void getLotteries()
    }, [accountConnected, web3Enabled])

    return (
        <div
            className="columns-2 gap-2 flex justify-center items-center min-h-[calc(100vh-2.5rem)] p-8 pt-24">
            <div className="text-center z-10 text-xl text-white">
                <h1 className="text-6xl drop-shadow-2xl">
                    <Logo/>
                </h1>
                <h5 className="mt-8">
                    <code>My Lotteries</code>
                </h5>

                <div className="flex flex-col">
                    <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
                        <div className="py-2 inline-block min-w-full sm:px-6 lg:px-8">
                            <div className="overflow-hidden">
                                <table className="min-w-full">
                                    <thead className="bg-white border-b">
                                    <tr>
                                        <th scope="col"
                                            className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                                            Address
                                        </th>
                                        <th scope="col"
                                            className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                                            First
                                        </th>
                                        <th scope="col"
                                            className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                                            Last
                                        </th>
                                        <th scope="col"
                                            className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                                            Handle
                                        </th>
                                    </tr>
                                    </thead>
                                    <tbody className={'w-full relative'}>
                                    {!tableLoader &&
                                      <tr>
                                        <td className="absolute w-full p-4 bg-white text-sm text-center text-black">Loading...</td>
                                      </tr>
                                    }
                                    {/*{lotteries.length &&*/}
                                    {/*  <tr>*/}
                                    {/*    <td className="absolute w-full p-4 bg-white text-sm text-center text-black">No results...</td>*/}
                                    {/*  </tr>*/}
                                    {/*}*/}
                                    {lotteries.map(e => (
                                        <tr className="bg-white border-b transition duration-300 ease-in-out hover:bg-gray-100">
                                            <td className="text-left px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{e}</td>
                                            <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">

                                            </td>
                                            <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                                Otto
                                            </td>
                                            <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                                @mdo
                                            </td>
                                        </tr>
                                    ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
