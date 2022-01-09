import React from "react";

export default function FormEntry({name, setter, height, type="text"}) {
    return(<div className="flex flex-col items-start mb-2 flex-1 w-full">
        <span className="text-sm font-medium">{name}</span>
        <input type={type} onChange={setter} className={`w-full ${height} border-gray-200 border drop-shadow-sm outline-none rounded-md my-1.5 px-2 pb-0.5 text-sm focus:border-2 focus:border-primary`}></input>
    </div>)
}