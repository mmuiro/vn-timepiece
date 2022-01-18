import React from 'react';
import { AiOutlineLoading3Quarters } from "react-icons/ai";

export default function LoadingPage() {
    return (<div className="flex flex-col items-center justify-center py-24 bg-gray-100 min-h-screen">
        <AiOutlineLoading3Quarters className="w-24 h-24 text-primary animate-spin"/>
        <h1 className="mt-4 text-primary text-xl">Loading...</h1>
    </div>);
};