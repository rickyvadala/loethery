import React from "react";

type LInputType = {
    value: any,
    setValue: React.Dispatch<React.SetStateAction<any>>,
    disabled?: boolean,
}

export const LInput = ({value, setValue, disabled}: LInputType) => {
    return (
        <div className="relative rounded-md shadow-sm">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                <span className="text-gray-500 sm:text-sm">$</span>
            </div>
            <input type="number" name="input"
                   disabled={disabled}
                   min="0"
                   onChange={e => setValue(e.target.value)}
                   value={value}
                   className="text-black block w-full rounded-md border-gray-300 pl-7 pr-12 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                   placeholder="Set a ticket price!"/>
        </div>
    )
}
