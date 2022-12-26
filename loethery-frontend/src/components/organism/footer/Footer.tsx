import React from "react";
import {Social} from "../../atoms/social/Social";

export const Footer: React.FC = () => {
    return (
        <footer className={"bg-gradient-to-r from-indigo-800 to-[#910572] relative"}>
            <div className={"h-24 bg-gradient-to-t from-[#910572] to-amber-500 rounded-t-[36px]"}>
                <div className={"absolute w-full -top-16 flex justify-center"}>
                    <div
                        className={"flex flex-col justify-center text-lg text-white bg-indigo-900 max-w-md py-4 px-8 rounded-xl shadow-xl"}>
                        <code>Developed with <span className={"text-xl animate-pulse text-red-500"}>♥</span> by&nbsp;
                            <a className={"hover:bg-amber-500 font-bold"} target="_blank"
                               href="https://www.rickyvadala.com/">@rickyvadala</a>
                        </code>
                        <hr className={"my-4 h-2 w-full"}/>
                        <Social/>
                    </div>
                </div>
            </div>
        </footer>
    )
}
