import React, { useState } from "react";
import { FiChevronDown } from "react-icons/fi";

export default function Dropdown({ value, setValue, options, width, height }) {
    const [show, setShow] = useState(false);

    return (<div className={`relative ${width} mx-1.5`} onBlur={() => setTimeout(() => setShow(false), 100)}>
        <button className={`${width} ${height} rounded-md bg-pink-700 drop-shadow-md flex items-center justify-center`} onClick={() => setShow(!show)}>
            <div className="absolute bg-gradient-to-br from-rose-500 to-pink-500 -top-1 h-full w-full rounded-md flex justify-between items-center">
                <span className="mx-auto text-base text-white">{value}</span>
                <FiChevronDown className="text-white h-4 w-4 mr-1"/>
            </div>
        </button>
        {show && <div className={`absolute my-1 rounded-md bg-white w-full py-1 ${!show ? "hidden" : ""} drop-shadow-md z-30`}>
            {options.map((option, i) => {
                return <div className={`w-full cursor-pointer flex py-1 items-center justify-center ${option === value ? 
                    "bg-gradient-to-br from-rose-500 to-primary text-white" : 
                    "text-neutral-800 hover:bg-neutral-200"}`} key={i} onClick={() => {setValue(option); setShow(false);}}>
                        <span className="text-sm">{option}</span>
                    </div>;
            })}
        </div>}
    </div>);
}