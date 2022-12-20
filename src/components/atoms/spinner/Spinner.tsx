import etherSpinner from "../../../assets/img/ether-spinner.png";
import React from "react";


export const Spinner: React.FC<{ loading: boolean }> = ({loading}) => {
    return (
        <>
            {loading &&
              <div className={"bg-indigo-900/75 fixed min-h-screen min-w-full flex items-center justify-center z-50"}>
                <img src={etherSpinner} alt={"Spinner"} className={"animate-spin absolute opacity-75"}/>
              </div>
            }
        </>
    )
}
