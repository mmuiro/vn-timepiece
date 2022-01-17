import React, { useContext, useEffect, useState } from "react";
import ReadingEntryList from "../components/ReadingEntryList";
import { AuthContext } from "../context/auth";
import fetchWithAuth from "../utils/fetchWithAuth";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

export default function UserHomePage() {
    const { updateSignedIn } = useContext(AuthContext);
    const [serverMsg, setServerMsg] = useState('');
    const [loading, setLoading] = useState(true);
    const [success, setSuccess] = useState(false);
    const [notStartedVNList, setNotStartedVNList] = useState([]);
    const [startedVNList, setStartedVNList] = useState([]);
    const [completedVNList, setCompletedVNList] = useState([]);
    const [username, setUsername] = useState('');

    const processVNList = vnList => {
        vnList.forEach(entry => {
            entry.addedDate = (new Date(entry.addedDate)).toLocaleDateString();
            if (!entry.started) {
                notStartedVNList.push(entry);
            } else {
                entry.startDate = (new Date(entry.startDate)).toLocaleDateString();
                entry.lastPlayedDate = (new Date(entry.lastModifiedDate)).toLocaleDateString();
                if (entry.completed) {
                    entry.completeDate = (new Date(entry.completeDate)).toLocaleDateString();
                    completedVNList.push(entry);
                } else { startedVNList.push(entry); }
            }
        });
        const sortFunction = (e1, e2) => {
            const date1 = e1.lastModifiedDate ? new Date(e1.lastModifiedDate) : new Date(0);
            const date2 = e2.lastModifiedDate ? new Date(e2.lastModifiedDate) : new Date(0);
            if (date1 - date2 === 0) return e1.title.localeCompare(e2.title);
            return date2 - date1;
        };
        setCompletedVNList(completedVNList => completedVNList.sort(sortFunction));
        setStartedVNList(startedVNList => startedVNList.sort(sortFunction));
        setNotStartedVNList(notStartedVNList => notStartedVNList.sort(sortFunction));
    };

    useEffect(() => {
        async function getUserData() {
            const res = await fetchWithAuth("/api/user/home", 'GET');
            const json = await res.json();
            if (json.success) {
                setUsername(json.userData.username)
                processVNList(json.userData.vnList);
                setSuccess(true);
            } else {
                setSuccess(false);
                updateSignedIn();
            }
            setServerMsg(json.message);
            setLoading(false);    
        }
        getUserData();
    }, []);

    return (<div className="flex flex-col items-center px-8 py-12 bg-gray-50 min-h-screen">
        {loading ? <AiOutlineLoading3Quarters className="w-16 h-16 text-primary animate-spin m-3"/> : 
            (startedVNList.length === 0 && notStartedVNList.length === 0 && completedVNList.length === 0 ? 
                <div className="p-8">
                    <span className="text-gray-400">You haven't added any visual novels yet. Use the searchbar to find and add some.</span>
                </div>
                : <>
                    <ReadingEntryList category="Continue Reading" entryList={startedVNList} />
                    <ReadingEntryList category="Start Reading" entryList={notStartedVNList} />
                    <ReadingEntryList category="Completed" entryList={completedVNList} />
                </>
            )
        }
    </div>);
}