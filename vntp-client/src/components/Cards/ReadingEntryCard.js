import React, { useContext } from "react";
import { AuthContext } from "../../context/auth";
import fetchWithAuth from "../../utils/fetchWithAuth";
import { msToTimeString } from "../../utils/timeUtil";
import Button from "../Button";

export default function ReadingEntryCard({ vndbID, title, originalTitle, addedDate, started, completed, playStatus, startDate, completeDate, playTime, size }) {
    const { updateSignedIn } = useContext(AuthContext);

    const startVN = async (e) => {
        e.preventDefault();
        const res = await fetchWithAuth("/api/reader/addAction", 'POST', JSON.stringify({
            vndbID: vndbID,
            type: 'Start'
        }));
        const json = await res.json();
        if (json.success) {
            alert(json.message);
        } else {
            updateSignedIn();
        }
    }

    return <div className={`transition ${size} rounded-md drop-shadow-md bg-white flex flex-col mx-4 my-4 hover:-translate-y-0.5 hover:drop-shadow-xl`}>
        <div className="w-full rounded-t-md bg-gradient-to-br from-rose-600 to-pink-600 h-3"></div>
        <div className="flex flex-col items-start p-4 space-y-2">
            <h1>{title}</h1>
            <h1>Date added: {addedDate}</h1>
            <h1>Status: {playStatus}</h1>
            <div className="flex justify-between">
                {started && <h1>Started {startDate}</h1>}
                {completed && <h1>Completed {completeDate}</h1>}
            </div>
            {started && <h1>Play time: {msToTimeString(playTime)}</h1>}
            <Button clickFn={started ? undefined : startVN} text={started ? (completed ? "View" : "Resume") : "Start"} size="w-32 h-8"/>
        </div>
    </div>;
};