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
            // create pop up directing user to login page
        } else {
            setServerMsg(json.message);
        }
    }

    return(<div className="flex flex-col items-center py-24 bg-gray-50 min-h-screen max-w-7xl">
        <FormBody size="w-[26rem] h-fit" title="Register">
            <FormEntry name="Username" setter={(e) => setUsername(e.target.value)} height="h-8" />
            <FormEntry name="Password" setter={(e) => setPassword(e.target.value)}  height="h-8" />
            <FormEntry name="Email" setter={(e) => setEmail(e.target.value)} height="h-8" />
            <Button clickFn={handleRegister} size="w-52 h-8" text="Register" margin="mt-4"/>
        </FormBody>
        
    </div>);
}