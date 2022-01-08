import React, { useState } from 'react';

const AuthContext = React.createContext();

function AuthContextProvider({ children }) {
    const [state, setState] = useState({
        status: 'none',
        signedIn: false,
        errorMsg: null,
        user: null,
        email: null
    });

    const getSignedIn = async () => {
        fetch(process.env.REACT_APP_API_URL + "/api/user/auth")
    }

    return (<AuthContext.Provider value={ state }>
        {children}
    </AuthContext.Provider>);   
}