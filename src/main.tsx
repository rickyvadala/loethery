import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import MetaMaskAccountProvider from "./providers/MetaMaskProvider";
import ContractProvider from "./providers/ContractProvider";
import {LotteryLayout} from "./layouts/lottery-layout/LotteryLayout";
import {Play} from "./pages/play/Play";
import {Contract} from "./pages/contract/Contract";
import {Connect} from "./pages/connect/Connect";

const router = createBrowserRouter([
    {
        path: "/",
        element: <LotteryLayout/>,
        children: [
            {
                index: true,
                element: <Connect/>,
            },
            {
                path: 'play',
                element: <Play/>,
            },
            {
                path: 'contract',
                element: <Contract/>,
            }
        ]
    },
]);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <React.StrictMode>
        <MetaMaskAccountProvider>
            <ContractProvider>
                <RouterProvider router={router}/>
            </ContractProvider>
        </MetaMaskAccountProvider>
    </React.StrictMode>,
)

declare global {
    interface Window {
        ethereum: any,
    }
}
