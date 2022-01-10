import React from "react";
import { FaClock } from "react-icons/fa";
import { HiPlay, HiFlag } from "react-icons/hi";
import { msToTimeString } from "../../utils/timeUtil";

export default function ProfileCard({ username, numVNsStarted, numVNsCompleted, totalPlayTime, registerDate, lastActiveDate, lastReadVN, size }) {
    return (<div className={`bg-white ${size} rounded-lg drop-shadow-md flex flex-col items-center`}>
        <div className="bg-gradient-to-br from-rose-500 to-primary w-full flex justify-center p-4 rounded-t-lg">
            <h1 className="text-4xl text-white">{username}</h1>
        </div>
        <div className="flex flex-col items-center p-4">
            <div className="flex justify-between w-full mb-4">
                <div className="flex items-center mx-4">
                    <HiPlay className="text-rose-600 mr-1 w-8 h-8" />
                    <span className="text-lg">VNs Started: {numVNsStarted}</span>
                </div>
                <div className="flex items-center mx-4">
                    <HiFlag className="text-pink-600 mr-1 w-8 h-8" />
                    <span className="text-lg">VNs Completed: {numVNsCompleted}</span>
                </div>
                <div className="flex items-center mx-4">
                    <FaClock className="text-fuchsia-600 mr-1 w-7 h-7" />
                    <span className="text-lg">Total Play Time: {msToTimeString(totalPlayTime)}</span>
                </div>
            </div>
            <div className="flex justify-between w-full">
                <span className="mx-4">Registered On: {registerDate}</span>
                <span className="mx-4">Last Active: {lastActiveDate}</span>
            </div>
        </div>
    </div>);
}