import {Github, Instagram, Linkedin} from "@icons-pack/react-simple-icons";
import React from "react";

export const Social: React.FC = () => {
    return (
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
    )
}
