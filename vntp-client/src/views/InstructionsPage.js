import React from "react";
import { Link } from "react-router-dom";

export default function InstructionPage() {
    return (<div className="bg-gray-100 min-h-screen flex justify-center px-8 py-12">
        <div className="bg-white rounded-lg drop-shadow-lg flex flex-col items-start p-8 max-w-[60%] space-y-4">
            <span className="text-2xl font-semibold leading-normal">How to use this site</span>
            <div className="flex flex-col">
                <span className="text-lg font-medium leading-normal">Getting started</span>
                <span>After creating an account and signing in, use the <p className="text-rose-500 inline">searchbar</p> in the upper-left corner or head to the <Link to="/search" className="transition text-rose-500 inline hover:text-rose-300">search page</Link> to find visual novels you'd like to <p className="text-rose-500 inline">add to your reading list</p>.</span>
            </div>
            <div className="flex flex-col">
                <span className="text-lg font-medium leading-normal">Tracking Reading Times</span>
                <span>After adding, you can find your reading list at your home page, where you can either <p className="text-rose-500 inline">start tracking</p> visual novels you've added, <p className="text-rose-500 inline">resume</p> ones you've started reading, or <p className="text-rose-500 inline">view</p> ones you've marked as completed.</span>
                <span>Choosing to start, resume, or view a reading entry will take you to a <p className="text-rose-500 inline">reading page</p>. From this page, depending on the <p className="text-rose-500 inline">status</p> of the entry, you can do various things.</span>
                <ul className="list-disc pl-8">
                    <li>
                        <div className="flex flex-col">
                            <span>If the entry is not marked as completed, you can either <p className="text-rose-500 inline">modify your total playtime</p> for that novel or <p className="text-rose-500 inline">start a reading session</p>. Starting a session will start a <p className="text-rose-500 inline">timer</p>, which you can pause/unpause at any time. While your session is paused, you can modify both your session and total playtimes for that novel. Note that:</span>
                            <ul className="pl-8 list-[square]">
                                <li>Modifying your total playtime for a novel will also <p className="text-rose-500 inline">end your current reading session</p>, if you started one.</li>
                                <li>Only sessions <p className="text-rose-500 inline">exceeding 5 minutes</p> will be saved to your history.</li>
                                <li>Sessions will be <p className="text-rose-500 inline">automatically ended at 12:00 A.M.</p> in your timezone.</li>
                                <li>A session can be ended in two ways: either by <p className="text-rose-500 inline">using the "End Session" button</p> or by <p className="text-rose-500 inline">navigating to a different page on the site</p>. Reloading or closing the window will end but not save your session.</li>
                            </ul>
                        </div>
                    </li>
                    <li>If the entry is marked as completed, you can view its total playtime or <p className="text-rose-500 inline">mark the entry as incomplete.</p></li>
                </ul>
            </div>
            <div className="flex flex-col">
                <span className="text-lg font-medium leading-normal">Reading History</span>
                <span>Your history will show: </span>
                <ul className="pl-8 list-disc">
                    <li>When you started reading a visual novel</li>
                    <li>Any saved sessions</li>
                    <li>Any modifications to total playtime for a novel</li>
                    <li>When you marked a visual novel as completed</li>
                    <li>When you marked a visual novel as incomplete</li>
                </ul>
            </div>
            <div className="flex flex-col">
                <span className="text-lg font-medium leading-normal">Profile</span>
                <span>You can find your <p className="text-rose-500 inline">registration date</p>, <p className="text-rose-500 inline">last active date</p>, <p className="text-rose-500 inline">cumulative reading time</p>, and <p className="text-rose-500 inline">number of started/completed visual novels</p> on your profile.</span>
            </div>
        </div>
    </div>);
}