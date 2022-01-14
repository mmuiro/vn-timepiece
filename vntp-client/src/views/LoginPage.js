import React, { useEffect, useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import FormEntry from "../components/Form/FormEntry";
import FormBody from "../components/Form/FormBody";
import Button from "../components/Buttons/Button";
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
            <Button clickFn={handleLogin} size="w-full h-8" margin="mt-6"><span className="text-white font-medium">Login</span></Button>
            <p className="text-sm mt-4">Don't have an account yet? <Link className="inline text-primary" to="/register">Register here.</Link></p>
            {serverMsg !== '' && <p className={`text-center ${success ? "text-green-500" : "text-red-500"} mt-4`}>{serverMsg}</p>}
        </FormBody>
    </div>);
}