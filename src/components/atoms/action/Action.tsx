import React from "react";

type ActionType = {onClick: any, label: string, disabled?: boolean}
export const Action: React.FC<ActionType> = ({onClick, label, disabled = false}) => {
    return (
        <button onClick={onClick}
                disabled={disabled}
                className="w-full flex items-center cursor-pointer justify-center drop-shadow-2xl rounded-lg bg-amber-500 p-6 font-bold text-white shadow-sm ring-1 ring-amber-500
                disabled:bg-gray-400 disabled:ring-gray-400 disabled:cursor-default
                hover:bg-amber-400 hover:ring-amber-400"
        >
            <code>
                {label}
            </code>
        </button>
    )
}
