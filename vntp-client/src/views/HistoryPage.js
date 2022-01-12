import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/auth";
import fetchWithAuth from "../utils/fetchWithAuth";
import ActionList from "../components/ActionList";

export default function HistoryPage() {
    const { authState, updateSignedIn } = useContext(AuthContext);
    const [actionList, setActionList] = useState([]);
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
            } else {
                updateSignedIn();
            }
        }
        getHistory();
    }, []);

    return (<div className="flex flex-col items-center px-8 py-12 bg-gray-50 min-h-screen">
        <ActionList username={authState.username} actionList={actionList} />
    </div>);
}