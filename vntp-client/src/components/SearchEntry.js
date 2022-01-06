import React from "react";
import { useState } from "react";
import { BsClock } from "react-icons/bs";
import { AiOutlineClockCircle } from "react-icons/ai";
import Button from "./Button";
import Toggle from "./Toggle";

const lengths = ["Very Short (<2 hrs)", "Short (2-10 hrs)", "Medium (10-30 hrs)", "Long (30-50 hrs)", "Very Long (50+ hrs)"];

export default function SearchEntry({imageURL, imageNSFW, title, originalTitle, originalLang, lengthIndex, id}) {
    const [showImg, setShowImg] = useState(true);
    const [showOriginal, setShowOriginal] = useState(false);

    const handleAdd = async (e) => {
        e.preventDefault();
        const url = new URL(process.env.REACT_APP_API_URL + "/api/novel/add")
        const res = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ id: id })
        });
    }

    return <div className="transition flex items-start bg-white rounded-md h-32 drop-shadow-md w-[24rem] m-4 hover:-translate-y-1 hover:drop-shadow-xl">
        <div className="h-full w-[28%] shrink-0 grow-0">
            {imageNSFW ? <div className="h-full w-full flex flex-shrink-0 items-center justify-center"><button>NSFW</button></div> : <img src={imageURL} className="h-full w-full object-cover rounded-l-md mr-0" />}
        </div>
        <div className="relative flex flex-col w-[64%] shrink h-full py-3 mx-4 grow-0">
            <h1 className="truncate font-semibold text-lg drop-shadow-sm text-gray-800">{showOriginal ? originalTitle : title}</h1>
            { (lengthIndex < lengths.length && lengthIndex >= 0) ? 
                <div className="flex items-center my-1">
                    <BsClock className="text-gray-800"/>
                    <span className="ml-2 text-sm leading-normal text-gray-800">{lengths[lengthIndex]}</span>
                </div> : null 
            }
            <div className="absolute bottom-3 flex items-center h-[24%] justify-between w-full">
                {originalTitle !== null ? <Toggle colorLeft="bg-primary-dark" colorRight="bg-rose-600" textLeft="EN" textRight={originalLang.toUpperCase()} toggled={showOriginal} setToggled={(showOriginal) => setShowOriginal(showOriginal)}/> : null}
                <Button text="Add" size="w-[40%] h-full"></Button>
            </div>
        </div>
    </div>
}