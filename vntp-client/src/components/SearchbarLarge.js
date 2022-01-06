import React, { useState } from "react";

export default function SearchbarLarge({ changeFn, submitFn, value }) {
    return(<form onSubmit={submitFn} className="flex drop-shadow-md rounded-md bg-white p-4">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 stroke-2 fill-transparent stroke-primary-light ml-1 mr-2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
        <input type="text" onChange={changeFn} value={value} placeholder="Search..." className="w-[30rem] outline-0"></input>
    </form>);
}