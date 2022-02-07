import React, { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/auth";
import ProfileCard from "../components/Cards/ProfileCard";
import fetchWithAuth from "../utils/fetchWithAuth";

export default function ProfilePage() {
    const { authState, updateSignedIn } = useContext(AuthContext);
    const [userData, setUserData] = useState({});
    const [loaded, setLoaded] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        if (authState.signedIn === false) navigate("/");
    }, [authState]);

    useEffect(() => {
        async function getProfile() {
            const res = await fetchWithAuth('/api/user/profile', 'GET');
            const json = await res.json();
            if (json.success) {
                json.userData.registerDate = (new Date(json.userData.registerDate)).toLocaleDateString();
                json.userData.lastActiveDate = (new Date(json.userData.lastActiveDate)).toLocaleDateString();
                setUserData(json.userData);
                setLoaded(true);
            } else {
                updateSignedIn();
            }
        }
        if (!loaded) {
            getProfile();
        }
        return () => {
            setLoaded(false);
        };
    }, [location]);

    return (<div className="flex flex-col items-center py-24 bg-gray-100">
        {loaded ? <ProfileCard {...userData} size="w-max-content"></ProfileCard> : null}
    </div>);
}