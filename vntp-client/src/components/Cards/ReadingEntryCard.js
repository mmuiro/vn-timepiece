import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/auth";
import fetchWithAuth from "../../utils/fetchWithAuth";
import { msToTimeString } from "../../utils/timeUtil";
import Button from "../Buttons/Button";

export default function ReadingEntryCard({ vndbID, title, originalTitle, imageLink, imageNSFW, addedDate, started, completed, playStatus, startDate, completeDate, playTime, lastPlayedDate, size }) {
    const { updateSignedIn } = useContext(AuthContext);
    const [showImg, setShowImg] = useState(!imageNSFW);
    const navigate = useNavigate();

    const startVN = async (e) => {
        e.preventDefault();
        const res = await fetchWithAuth("/api/reader/addAction", 'POST', JSON.stringify({
            vndbID: vndbID,
            type: 'Start'
        }));
        const json = await res.json();
        if (json.success) {
            navigate(`/reader/${vndbID}`);
        } else {
            updateSignedIn();
        }
    }

    const viewVN = (e) => {
        e.preventDefault();
        navigate(`/reader/${vndbID}`);
    }

    return <div className={`transition ${size} rounded-md drop-shadow-md bg-white flex flex-col mx-4 my-4 hover:-translate-y-0.5 hover:drop-shadow-xl`}>
        <div className="w-full h-14 flex items-center justify-center py-2 px-10">
            <span className="text-base bg-gradient-to-br bg-clip-text from-rose-500 to-pink-600 text-transparent truncate">{title}</span>
        </div>
        <div className="w-full bg-gradient-to-br from-rose-500 to-pink-500 flex items-center justify-center py-1">
            <span className="text-white text-sm">{playStatus}</span>
        </div>
        <div className="relative flex w-full h-64">
            <div className="h-full w-1/2 bg-gray-50">
                <div className="flex w-full h-fit max-h-full">
                    {showImg ? <img src={imageLink} className="w-full object-cover" /> : 
                    <div className="bg-primary text-white p-1 h-64 w-full flex flex-col flex-shrink-0 items-center justify-center text-center text-sm">This image may contain sensitive content.<button onClick={() => setShowImg(true)} className="transition hover:text-primary-light">Show anyways</button></div>}
                </div>
            </div>
            <div className="flex flex-col items-start p-4 w-1/2 text-sm">
                <div className="flex flex-col mb-2">
                    <span className="border-b border-rose-400 text-rose-400 text-xs">Added</span>
                    <span className="">{addedDate}</span>
                </div>

                <div className="flex justify-between mb-2 w-full">
                    {started && 
                        <div className="flex flex-col mr-2">
                            <span className="border-b border-rose-400 text-rose-400 text-xs">Started</span>
                            <span>{startDate}</span>
                        </div>
                    }
                    {completed && 
                        <div className="flex flex-col mr-2">
                            <span className="border-b border-rose-400 text-rose-400 text-xs">Completed</span>
                            <span>{completeDate}</span>
                        </div>
                    }
                </div>
                {started && 
                    <>
                        <div className="flex flex-col mb-2">
                            <span className="border-b border-rose-400 text-rose-400 text-xs">Play time</span>
                            <span>{msToTimeString(playTime)}</span>
                        </div>
                        <div className="flex flex-col mb-2">
                            <span className="border-b border-rose-400 text-rose-400 text-xs">Last played</span>
                            <span>{lastPlayedDate}</span>
                        </div>
                    </>
                }
                <div className="grow flex items-end">
                    <Button clickFn={started ? viewVN : startVN} size="w-32 h-8" margin="mt-2">
                        <span className="text-white font-medium">{started ? (completed ? "View" : "Resume") : "Start"}</span>
                    </Button>
                </div>
            </div>
        </div>
        <div className="w-full rounded-b-md bg-gradient-to-br from-rose-500 to-pink-600 h-3"></div>
    </div>;
};

/* <div className={`transition ${size} rounded-md drop-shadow-md bg-white flex flex-col mx-4 my-4 hover:-translate-y-0.5 hover:drop-shadow-xl`}>
        <div className="w-full rounded-t-md bg-gradient-to-br from-rose-600 to-pink-600 h-3"></div>
        <div className="flex flex-col items-start p-4 space-y-2">
            <h1>{title}</h1>
            <h1>Date added: {addedDate}</h1>
            <h1>Status: {playStatus}</h1>
            <div className="flex justify-between">
                {started && <h1 className="mr-4">Started {startDate}</h1>}
                {completed && <h1>Completed {completeDate}</h1>}
            </div>
            {started && 
                <>
                    <h1>Play time: {msToTimeString(playTime)}</h1>
                    <h1>Last played: {lastPlayedDate}</h1>
                </>
            }
            <Button clickFn={started ? viewVN : startVN} size="w-32 h-8">
                <span className="text-white font-medium">{started ? (completed ? "View" : "Resume") : "Start"}</span>
            </Button>
        </div>
    </div> */