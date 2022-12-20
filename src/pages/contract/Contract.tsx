import React from "react";
import {Prism as SyntaxHighlighter} from 'react-syntax-highlighter';
import {vscDarkPlus} from 'react-syntax-highlighter/dist/esm/styles/prism';
import {address, contract} from "../../utils/constants";
import {Logo} from "../../components/atoms/logo/Logo";
import {ChainEnum} from "../../utils/enums/ChainEnum";

export const Contract = () => {
    return (
        <div className="flex justify-center flex-wrap min-h-screen p-8 pt-24 text-white">
            <h1 className="z-20 w-full my-12 text-5xl sm:text-7xl lg:text-8xl drop-shadow-2xl w-full flex items-center justify-center">
                <Logo/>
            </h1>
            <code className={"z-20 flex justify-left w-full max-w-screen-md"}>Solidity contract</code>
            <code className={"z-20 flex justify-left w-full max-w-screen-md"}>Address: {address}</code>
            <code className={"z-20 flex justify-left w-full max-w-screen-md"}>Network: Goerli Testnet
                (ChainID: {ChainEnum.GOERLI_TEST_NETWORK})
            </code>
            <SyntaxHighlighter className={"z-20 max-w-screen-md w-full"} language="javascript" style={vscDarkPlus}>
                {contract}
            </SyntaxHighlighter>
        </div>
    );
};
