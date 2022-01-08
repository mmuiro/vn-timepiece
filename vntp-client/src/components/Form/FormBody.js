import React from "react";

export default function FormBody({size, title, children}) {
    return (<div className={`${size} rounded-lg drop-shadow-md bg-white flex flex-col items-center px-10 py-6`}>
        {children}
    </div>);
}