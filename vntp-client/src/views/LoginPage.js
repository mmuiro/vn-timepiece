import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import FormEntry from "../components/Form/FormEntry";
import FormBody from "../components/Form/FormBody";
import Button from "../components/Button";
import fetchWithAuth from "../utils/fetchWithAuth";
import { AuthContext } from "../context/auth";

export default function LoginPage() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [serverMsg, setServerMsg] = useState('');
    const [success, setSuccess] = useState(false);
    const navigate = useNavigate();
    const { authState, updateSignedIn } = useContext(AuthContext);

    useEffect(() => {
        if (authState.signedIn) navigate("/");
    }, [authState]);

    const handleLogin = async (e) => {
        e.preventDefault();
        const res = await fetchWithAuth('/api/user/login', 'POST', JSON.stringify({ username, password }));
        const json = await res.json();
        setServerMsg(json.message);
        if (json.success) {
            setSuccess(true);
            localStorage.setItem('authToken', json.authToken);
            updateSignedIn();
        } else setSuccess(false);
    }

    return(<div className="flex flex-col items-center py-24 bg-gray-50 min-h-screen">
        <FormBody size="w-[26rem] h-fit" title="Login">
            <FormEntry name="Username" setter={(e) => setUsername(e.target.value)} height="h-8" />
            <FormEntry name="Password" setter={(e) => setPassword(e.target.value)}  height="h-8" type="password" />
            <Button clickFn={handleLogin} size="w-full h-8" text="Login" margin="my-6"/>
            {serverMsg !== '' && <p className={`text-center ${success ? "text-green-500" : "text-red-500"}`}>{serverMsg}</p>}
        </FormBody>
    </div>);
}