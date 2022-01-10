import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/auth";
import NavbarLink from "./NavbarLink";
import Searchbar from "./Searchbar";

export default function Navbar() {
    const { authState } = useContext(AuthContext);
    return(<>
    <nav className="bg-primary drop-shadow-sm border-b-2 border-pink-600">
        <div className="max-w-7xl mx-auto">
            <div className="h-14 px-10 flex items-center justify-between">
                <div className="flex items-center justify-between">
                    <Link className="flex items-center flex-shrink-0 mr-16" to="/">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 stroke-2 stroke-white fill-transparent" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span className="ml-4 text-xl font-medium text-white">vntp</span>
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
                    <Link to="/settings">
                        <svg xmlns="http://www.w3.org/2000/svg" className="transition h-6 w-6 fill-primary-dark ml-6 mr-4 hover:fill-primary-light" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
                        </svg>
                    </Link>
                    <Link to="/logout">
                        <svg xmlns="http://www.w3.org/2000/svg" className="transition h-6 w-6 stroke-primary-dark fill-transparent hover:stroke-primary-light stroke-2" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                        </svg>
                    </Link>
                </div>
            </div>
        </div>
    </nav>
    </>);
}