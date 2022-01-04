import React, { useEffect } from "react";
import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import SearchbarLarge from "../components/SearchbarLarge";
import SearchEntry from "../components/SearchEntry";

export default function SearchPage() {
    const [searchParams, setSearchParams] = useSearchParams();
    const [searchQuery, setSearchQuery] = useState(searchParams.get('query'));
    const [existMoreResults, setExistMoreResults] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [searchResults, setSearchResults] = useState([]);

    const handleSearch = e => {
        e.preventDefault();
        setSearchParams({ query: searchQuery });
    };

    const performVNDBSearch = async (searchQuery) => {
        try {
            const url = new URL(process.env.REACT_APP_API_URL + "/search/fetch");
            url.searchParams.append("searchQuery", searchQuery);
            url.searchParams.append("page", currentPage);
            const res = await fetch(url, {
                method: 'GET',
            });
            const json = await res.json();
            if (json.success) {
                let { more, results } = json;
                setExistMoreResults(more);
                setSearchResults(searchResults => [...searchResults, ...results]);
            }
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        setSearchResults([]);
        setSearchQuery(searchParams.get('query'));
        if (searchQuery != null && searchQuery != '') {
            performVNDBSearch(searchQuery);
        }
    }, [searchParams]);

    return(<div className="flex flex-col items-center p-4">
        <SearchbarLarge changeFn={e => setSearchQuery(e.target.value)} submitFn={handleSearch} value={searchQuery} />
        <span>Provided by VNDB</span>
        <div className="flex flex-col items-center justify-start">
            {searchResults.map((entry, i) => (
                <SearchEntry key={i} imageURL={entry.image} imageNSFW={entry.image_nsfw} title={entry.title} originalTitle={entry.original} />
            ))}
        </div>
    </div>);
}