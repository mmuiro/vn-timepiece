import React, { useEffect, useState } from 'react';
import fetchWithAuth from '../utils/fetchWithAuth';

const AuthContext = React.createContext();

function AuthContextProvider({ children }) {
    const [loading, setLoading] = useState(false);
    const [authState, setAuthState] = useState({
        signedIn: undefined,
        username: null,
        email: null
    });

    async function updateSignedIn() {
        setLoading(true);
        const res = await fetchWithAuth(process.env.REACT_APP_API_URL + "/api/user/auth", 'GET');
        const json = await res.json();
        if (json.success) {
            setAuthState({
                signedIn: true,
                username: json.username,
                email: json.email
            });
        } else {
            localStorage.removeItem('authToken');
            setAuthState({
                signedIn: false,
                username: null,
                email: null
            });
        }
        setLoading(false);
    }

    useEffect(() => {
        updateSignedIn();
    }, []);

    return (<AuthContext.Provider value={{ authState, updateSignedIn }}>
        {loading ? <h1>Loading...</h1> : children}
    </AuthContext.Provider>);   
}

export { AuthContextProvider, AuthContext };