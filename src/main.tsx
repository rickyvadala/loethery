import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import {createBrowserRouter, RouterProvider,} from "react-router-dom";
import LotteryLayout from "./layouts/lottery-layout/LotteryLayout";
import Play from "./pages/play/Play";
import Connect from "./pages/connect/Connect";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Connect/>,
        index: true
    },
    {
        path: "play",
        element: <LotteryLayout/>,
        children: [
            {
                index: true,
                element: <Play/>,
            }
        ]
    },
]);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <React.StrictMode>
        <RouterProvider router={router}/>
    </React.StrictMode>,
)

declare global {
    interface Window {
        ethereum: any,
    }
}
