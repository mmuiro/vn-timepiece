import React from "react";
import { NavLink } from "react-router-dom";

export default function NavbarLink({ to="/", text="" }) {
    return(<NavLink className={({isActive}) => (isActive ? "bg-pink-600" : "bg-transparent") + " text-white transition w-fit h-fit px-3 py-1 text-sm font-medium mx-3 hover:text-pink-300 rounded-md" } to={to}>
        {text}
    </NavLink>);
}