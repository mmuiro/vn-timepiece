import React from "react";
import { useState } from "react";
import { BsClock } from "react-icons/bs";
import Button from "../Buttons/Button";
import Toggle from "../Toggle";
import { useNavigate } from "react-router-dom";
import fetchWithAuth from "../../utils/fetchWithAuth";
import Modal from "../Modal";

const lengths = ["Very Short (<2 hrs)", "Short (2-10 hrs)", "Medium (10-30 hrs)", "Long (30-50 hrs)", "Very Long (50+ hrs)"];

export default function SearchEntryCard({imageLink, imageNSFW, title, originalTitle, originalLang, lengthIndex, id}) {
    const [showImg, setShowImg] = useState(!imageNSFW);
    const [showOriginal, setShowOriginal] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [serverMsg, setServerMsg] = useState('');
    const navigate = useNavigate();

    const handleAdd = async (e) => {
        e.preventDefault();
        const url = new URL("https://vntp.qopri.me/api/novel/add")
        const res = await fetchWithAuth(url, 'POST', JSON.stringify({ vndbID: id }));
        const json = await res.json();
        if(json.success) {
            navigate("/");
        } else {
            setServerMsg(json.message);
            setShowModal(true);
        }
    }

    return <div className="transition flex items-start bg-white rounded-md h-32 drop-shadow-md w-[24rem] m-3 hover:-translate-y-1 hover:drop-shadow-xl">
        <div className="h-full w-[28%] shrink-0 grow-0">
            {showImg ? 
                <img src={imageLink} className="h-full w-full object-cover rounded-l-md mr-0" /> : 
                <div className="bg-gradient-to-br from-rose-500 to-pink-600 rounded-l-md text-white p-1 h-full w-full flex flex-col flex-shrink-0 items-center justify-center text-center text-xs">This image may contain sensitive content.<button onClick={() => setShowImg(true)} className="transition hover:text-primary-light">Show anyways</button></div>
            }
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
                <Button size="w-[40%] h-full" clickFn={handleAdd}><span className="text-white font-medium">Add</span></Button>
            </div>
        </div>
        {showModal && 
            <Modal show={showModal} close={() => setShowModal(false)}>
                <div className="max-w-[64rem] flex flex-col items-center">
                    <span className="whitespace-normal text-red-500 mb-4">{serverMsg}</span>
                    <Button clickFn={() => setShowModal(false)} size="w-20 h-8"><span className="text-white font-medium">Close</span></Button>
                </div>
            </Modal>
        }
    </div>
}
