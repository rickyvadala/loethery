import React from "react";
import {Prism as SyntaxHighlighter} from 'react-syntax-highlighter';
import {vscDarkPlus} from 'react-syntax-highlighter/dist/esm/styles/prism';
import {address} from "../../utils/constants/contracts/Lottery/address";
import {code} from "../../utils/constants/contracts/Lottery/code";
import {Logo} from "../../components/atoms/logo/Logo";
import {ChainEnum} from "../../utils/enums/ChainEnum";
import {Github} from "@icons-pack/react-simple-icons";

export const Code = () => {
    return (
        <div className="flex items-center flex-col min-h-[calc(100vh-2.5rem)] px-8 pt-24 pb-16 text-white text-md">
            <h1 className="z-20 w-full mt-12 mb-8 text-5xl sm:text-7xl lg:text-8xl drop-shadow-2xl w-full flex items-center justify-center">
                <Logo/>
            </h1>
            <div className={"z-20 flex flex-col items-center justify-center text-xl mb-4 text-center"}>
                <code>To see all the codebase, check the repo!</code>
                <a className={" rounded-full hover:bg-amber-500 w-[48px] mt-2"}
                   href="https://github.com/rickyvadala/loethery"
                   target="_blank">
                    <Github color='#fff' size={48}/>
                </a>
            </div>
            <code className={"z-20 flex justify-left w-full max-w-screen-md font-bold"}>Solidity Contract</code>
            <code className={"z-20 flex justify-left w-full max-w-screen-md break-all"}>Address: {address}</code>
            <code className={"z-20 flex justify-left w-full max-w-screen-md"}>Network: Goerli Testnet
                (ChainID: {ChainEnum.GOERLI_TEST_NETWORK})
            </code>
            <SyntaxHighlighter className={"z-20 max-w-screen-md w-full"} language="solidity" style={vscDarkPlus}>
                {code}
            </SyntaxHighlighter>
        </div>
    );
};
