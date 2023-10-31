import React, { useContext, useEffect } from "react";
import { useState } from "react";
import fetchWithAuth from "../utils/fetchWithAuth";
import FormBody from "../components/Form/FormBody";
import FormEntry from "../components/Form/FormEntry";
import Button from "../components/Buttons/Button";
import { AuthContext } from "../context/auth";
import { useNavigate } from "react-router-dom";

export default function UpdatePasswordPage() {
    const [password, setPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [serverMsg, setServerMsg] = useState('');
    const [success, setSuccess] = useState(false);
    const { authState } = useContext(AuthContext);
    const navigate = useNavigate();

    useEffect(() => {
        if (authState.signedIn === false) navigate('/login');
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const res = await fetchWithAuth("/api/user/changePassword", "POST",
            JSON.stringify({
                password,
                newPassword
            }));
        const json = await res.json();
        if (json.success) {
            setServerMsg(json.message);
            setSuccess(true);
        } else {
            setServerMsg(json.message);
            setSuccess(false);
        }
    }

    return(<div className="flex flex-col items-center py-24 bg-gradient-to-r from-rose-500 to-pink-500 min-h-screen">
        <FormBody size="w-[26rem] h-fit" title="Change Password">
            <FormEntry name="Password" setter={(e) => setPassword(e.target.value)} height="h-8" type="password" />
            <FormEntry name="New Password" setter={(e) => setNewPassword(e.target.value)}  height="h-8" type="password" />
            <Button clickFn={handleSubmit} size="w-full h-8" margin="my-6"><span className="text-white font-medium">Change Password</span></Button>
            {serverMsg !== '' && <p className={`text-center ${success ? "text-green-500" : "text-red-500"}`}>{serverMsg}</p>}
        </FormBody>
    </div>);
}
