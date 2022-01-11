import React, { useContext } from "react";
import { AuthContext } from "../context/auth";
import LandingPage from "./LandingPage";
import UserHomePage from "./UserHomePage";

export default function HomePage() {
    const { authState, updateSignedIn } = useContext(AuthContext);
    return authState.signedIn ? <UserHomePage /> : <LandingPage />;
}