import React from "react";
import { useState } from "react";
import { createSearchParams, useNavigate } from "react-router-dom";

export default function Searchbar() {
    const [searchQuery, setSearchQuery] = useState('');
    const navigate = useNavigate();
    const handleSearch = e => {
        e.preventDefault();
        const params = {query: searchQuery};
        navigate({
            pathname: '/search',
            search: `?${createSearchParams(params)}`
        });
    }

    return(<form onSubmit={handleSearch} className="flex items-center p-1.5 rounded-md drop-shadow-sm bg-pink-600">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 stroke-2 fill-transparent stroke-primary-light ml-1 mr-2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
        <input type="text" onChange={e => setSearchQuery(e.target.value)} placeholder="Search..." className="bg-transparent outline-0 text-sm text-primary-light placeholder:text-primary-light"></input>
    </form>);
}