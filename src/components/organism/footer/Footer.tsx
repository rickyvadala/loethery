import React from "react";
import {Github, Instagram, Linkedin} from '@icons-pack/react-simple-icons';

export const Footer: React.FC = () => {
    return (
        <div className={"bg-gradient-to-r from-indigo-800 to-[#910572] relative"}>
            <div className={"h-36 bg-gradient-to-t from-[#910572] to-amber-500 rounded-t-[36px]"}>
                <div className={"absolute w-full -top-10 flex justify-center"}>
                    <div
                        className={"flex flex-col justify-center text-lg text-white bg-indigo-900 max-w-md p-8 rounded-xl shadow-xl"}>
                        <code>Developed with <span className={"animate-pulse"}>♥</span> by&nbsp;
                            <a className={"hover:bg-amber-500 font-bold"} target="_blank"
                               href="https://www.rickyvadala.com/">@rickyvadala</a>
                        </code>
                        <hr className={"my-4 h-2 w-full"}/>
                        <div className={"flex justify-center gap-8"}>
                            <a className={"rounded-full hover:bg-amber-500"}
                               href="https://github.com/rickyvadala"
                               target="_blank">
                                <Github color='#fff' size={36}/>
                            </a>
                            <a className={"rounded-full hover:bg-amber-500"}
                               href="https://www.linkedin.com/in/ricardovadala/"
                               target="_blank">
                                <Linkedin color='#fff' size={36}/>
                            </a>
                            <a className={"rounded-full hover:bg-amber-500"}
                               href="https://www.instagram.com/rickyvadala/"
                               target="_blank">
                                <Instagram color='#fff' size={36}/>
                            </a>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
}
