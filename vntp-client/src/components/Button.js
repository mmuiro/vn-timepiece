import React from "react";
import { Link } from "react-router-dom";

export default function Button({ text, size, margin, position, linkTo=null, clickFn=null }) {
    return(<div className={`${position} ${size} ${margin}`}>
        <div className={`relative w-full h-full flex justify-center items-center rounded-md bg-pink-800 group`}>
            <div className="transition-all absolute w-full rounded-md h-full flex justify-center items-center -top-1 bg-gradient-to-br from-pink-500 to-pink-700 drop-shadow-md group-hover:-top-0.5 group-hover:cursor-pointer">
                {
                    (linkTo !== null) ?
                    <Link to={linkTo} className="text-white font-medium">{text}</Link> :
                    <button onClick={clickFn} className="text-white font-medium">{text}</button>
                }
            </div>
        </div>
    </div>);
}