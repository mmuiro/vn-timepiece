import React from "react";
import { Link } from "react-router-dom";

export default function Button({size, margin, position, rounding="rounded-md", linkTo=null, clickFn=null, children, bg="bg-gradient-to-br from-rose-500 to-pink-600", shadow="bg-pink-700" }) {
    let inner = <div className={`relative w-full h-full flex justify-center items-center ${rounding} ${shadow} group`}>
            <div className={`transition-all absolute w-full ${rounding} h-full flex justify-center items-center -top-1 ${bg} drop-shadow-md group-hover:-top-0.5 group-hover:cursor-pointer`}>
                {children}
            </div>
        </div>;

    return <div className={`${position ? position : ""} ${size} ${margin}`}>{linkTo !== null ? 
        <Link to={linkTo} className="w-full h-full">{inner}</Link> : 
        <button onClick={clickFn} className="w-full h-full">{inner}</button>}
    </div>;
}