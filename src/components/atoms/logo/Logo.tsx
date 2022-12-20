import React from "react";
import {NavigateFunction, useNavigate} from "react-router-dom";

export const Logo = ({fontColor = "text-white", bracketsColor = "text-amber-500"}) => {
    const navigate: NavigateFunction = useNavigate();

    return (
        <span onClick={() => navigate('/')}
              className={fontColor + " font-bold tracking-tight cursor-pointer" }>
            LO
            <span className={bracketsColor}>&#123;</span>
            ether
            <span className={bracketsColor}>&#125;</span>
            Y
        </span>
    )
}
