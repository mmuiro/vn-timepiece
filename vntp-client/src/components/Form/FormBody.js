import React from "react";

export default function FormBody({size, title, children}) {
    return (<div className={`${size} rounded-lg drop-shadow-md bg-white flex flex-col items-center px-10 py-8`}>
        <h1 className="text-2xl font-medium subpixel-antialiased mb-4">{title}</h1>
        {children}
    </div>);
}