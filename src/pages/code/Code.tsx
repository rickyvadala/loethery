import React from "react";
import {Prism as SyntaxHighlighter} from 'react-syntax-highlighter';
import {vscDarkPlus} from 'react-syntax-highlighter/dist/esm/styles/prism';
import {address, contract} from "../../utils/constants";
import {Logo} from "../../components/atoms/logo/Logo";
import {ChainEnum} from "../../utils/enums/ChainEnum";
import {Github} from "@icons-pack/react-simple-icons";

export const Code = () => {
    return (
        <div className="flex items-center flex-col min-h-screen p-8 pt-24 text-white text-md">
            <h1 className="z-20 w-full mt-12 mb-8 text-5xl sm:text-7xl lg:text-8xl drop-shadow-2xl w-full flex items-center justify-center">
                <Logo/>
            </h1>
            <div className={"z-20 flex flex-col items-center justify-center text-xl mb-4"}>
                <code>To see all the codebase, check the repo!</code>
                <a className={" rounded-full hover:bg-amber-500 w-[48px]"}
                   href="https://github.com/rickyvadala"
                   target="_blank">
                    <Github color='#fff' size={48}/>
                </a>
            </div>
            <code className={"z-20 flex justify-left w-full max-w-screen-md font-bold"}>Solidity Contract</code>
            <code className={"z-20 flex justify-left w-full max-w-screen-md break-all"}>Address: {address}</code>
            <code className={"z-20 flex justify-left w-full max-w-screen-md"}>Network: Goerli Testnet
                (ChainID: {ChainEnum.GOERLI_TEST_NETWORK})
            </code>
            <SyntaxHighlighter className={"z-20 max-w-screen-md w-full"} showLineNumbers={true} language="javascript" style={vscDarkPlus}>
                {contract}
            </SyntaxHighlighter>
        </div>
    );
};