import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/auth";

export default function LogoutPage() {
    const { authState, updateSignedIn } = useContext(AuthContext);
    const navigate = useNavigate();

    useEffect(() => {
        if (authState.signedIn === false) navigate("/login");
    }, [authState]);

    useEffect(() => {
        localStorage.removeItem('authToken');
        updateSignedIn();
    });

    return <></>;
};