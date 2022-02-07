import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/auth";
import Logo from "../Logo";
import NavbarLink from "./NavbarLink";
import Searchbar from "./Searchbar";


export default function Navbar() {
    const { authState } = useContext(AuthContext);
    return(<>
    <nav className="bg-gradient-to-r from-rose-500 to-pink-500">
        <div className="max-w-7xl mx-auto">
            <div className="h-14 px-10 flex items-center justify-between">
                <div className="flex items-center justify-between">
                    <Link className="flex items-center flex-shrink-0 mr-16" to="/">
                        <Logo strokeColor="stroke-white" strokeWidth="stroke-[24]" size="h-8 w-8"/>
                        <span className="ml-3 text-2xl text-white font-work">VNTimepiece</span>
                    </Link>
                    <div className="flex items-center justify-center">
                        <NavbarLink to="/" text="Home" />
                        { authState.signedIn ? 
                        <><NavbarLink to="/history" text="History" /><NavbarLink to="/profile" text="Profile" /></> :
                        <><NavbarLink to="/register" text="Register" /><NavbarLink to="/login" text="Login" /></> }
                    </div>
                </div>
                <div className="flex items-center justify-center">
                    <Searchbar />
                    {authState.signedIn && <>
                        <Link to="/logout" className="ml-6">
                            <svg xmlns="http://www.w3.org/2000/svg" className="transition h-6 w-6 stroke-pink-700 fill-transparent hover:stroke-primary-light stroke-2" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                            </svg>
                        </Link>
                    </>}
                    <Link to="/howto" className="ml-4">
                            <svg xmlns="http://www.w3.org/2000/svg" class="transition h-6 w-6 fill-pink-700 hover:fill-primary-light" viewBox="0 0 20 20">
                                <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clip-rule="evenodd" />
                            </svg>
                    </Link>
                </div>
            </div>
        </div>
    </nav>
    </>);
}