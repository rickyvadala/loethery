import React from "react";

export const Loader: React.FC<{ loading: boolean }> = ({loading}) => {
    return (
        <>
            {loading &&
              <div className={"bg-indigo-900/75 top-0 left-0 fixed min-h-screen min-w-full flex items-center justify-center z-50"}>
                <img src="/meta-fox.svg" alt={"Spinner"} className={"h-72 animate-bounce absolute"}/>
              </div>
            }
        </>
    )
}
