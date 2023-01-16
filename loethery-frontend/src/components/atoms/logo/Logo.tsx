import React from "react";

export const Logo = ({fontColor = "text-white", bracketsColor = "text-amber-500"}) => {
    return (
        <span className={fontColor + " font-bold tracking-tight"}>
            LO
            <span className={bracketsColor}>&#123;</span>
            ether
            <span className={bracketsColor}>&#125;</span>
            Y
        </span>
    )
}
