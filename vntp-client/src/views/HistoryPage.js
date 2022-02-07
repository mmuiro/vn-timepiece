import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/auth";
import fetchWithAuth from "../utils/fetchWithAuth";
import ActionList from "../components/ActionList";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

export default function HistoryPage() {
    const { authState, updateSignedIn } = useContext(AuthContext);
    const [actionList, setActionList] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        if (authState.signedIn === false) navigate("/login");
    }, [authState]);

    useEffect(() => {
        const getHistory = async() => {
            const res = await fetchWithAuth('/api/user/history', 'GET');
            const json = await res.json();
            if (json.success) {
                setActionList(json.actionList);
                setLoading(false);
            } else {
                updateSignedIn();
            }
        }
        getHistory();
    }, []);

    return (<div className="flex flex-col items-center px-8 py-12 bg-gray-100 max-w-7xl mx-auto">
        {loading ? <AiOutlineLoading3Quarters className="w-16 h-16 text-primary animate-spin m-3"/> : 
            (actionList.length > 0 ? <ActionList username={authState.username} actionList={actionList} /> : 
                <div className="p-6 text-gray-400">You haven't added or started any visual novels yet. Start by searching for and adding some visual novels.</div>
            )
        }
    </div>);
}