import React from 'react';
import { AiOutlineLoading3Quarters } from "react-icons/ai";

export default function LoadingPage() {
    return (<div className="flex flex-col items-center justify-center py-24 bg-gray-50 min-h-screen">
        <AiOutlineLoading3Quarters className="w-32 h-32 text-primary animate-spin"/>
        <h1 className="mt-8 text-primary text-xl">Loading...</h1>
    </div>);
};