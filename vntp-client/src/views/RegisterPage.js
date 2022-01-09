import React from "react";
import { useState } from "react";
import FormBody from "../components/Form/FormBody";
import FormEntry from "../components/Form/FormEntry";
import Button from "../components/Button";

export default function RegisterPage() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [serverMsg, setServerMsg] = useState('');
    const [success, setSuccess] = useState(false);

    const handleRegister = async (e) => {
        e.preventDefault();
        const res = await fetch(process.env.REACT_APP_API_URL + '/api/user/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username: username,
                password: password,
                email: email
            })
        });
        const json = await res.json();
        if (json.success) {
            setServerMsg(json.message);
            setSuccess(true);
        } else {
            setServerMsg(json.message);
            setSuccess(false);
        }
    }

    return(<div className="flex flex-col items-center py-24 bg-gray-50 min-h-screen">
        <FormBody size="w-[26rem] h-fit" title="Register">
            <FormEntry name="Username" setter={(e) => setUsername(e.target.value)} height="h-8" />
            <FormEntry name="Password" setter={(e) => setPassword(e.target.value)}  height="h-8" type="password" />
            <FormEntry name="Email" setter={(e) => setEmail(e.target.value)} height="h-8" />
            <Button clickFn={handleRegister} size="w-full h-8" text="Register" margin="my-6"/>
            {serverMsg !== '' && <p className={`text-center ${success ? "text-green-500" : "text-red-500"}`}>{serverMsg}</p>}
        </FormBody>
        
    </div>);
}