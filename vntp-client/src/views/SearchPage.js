import React, { useEffect } from "react";
import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import Button from "../components/Button";
import SearchbarLarge from "../components/SearchbarLarge";
import SearchEntry from "../components/SearchEntry";

export default function SearchPage() {
    const [searchParams, setSearchParams] = useSearchParams();
    const [searchQuery, setSearchQuery] = useState(searchParams.get('query'));
    const [existMoreResults, setExistMoreResults] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [searchResults, setSearchResults] = useState([]);
    const [searchReady, setSearchReady] = useState(false);

    useEffect(() => {
        setSearchResults([]);
        setCurrentPage(1);
        setSearchQuery(searchParams.get('query'));
        setSearchReady(true);
    }, [searchParams]);

    useEffect(() => {
        const performVNDBSearch = async (searchQuery) => {
            try {
                const url = new URL(process.env.REACT_APP_API_URL + "/api/search/fetch");
                url.searchParams.append("searchQuery", searchQuery);
                url.searchParams.append("page", currentPage);
                const res = await fetch(url, {
                    method: 'GET',
                });
                const json = await res.json();
                console.log(json.success)
                if (json.success) {
                    let { more, results } = json;
                    setExistMoreResults(more);
                    setCurrentPage(currentPage => currentPage + 1);
                    setSearchResults(searchResults => [...searchResults, ...results]);
                    setSearchReady(false);
                }
            } catch (err) {
                console.log(err);
            }
        };
        if (searchReady && searchQuery !== null && searchQuery !== '') {
            performVNDBSearch(searchQuery);
        }
    }, [searchReady]);

    const handleSearch = e => {
        e.preventDefault();
        setSearchParams({ query: searchQuery });
    };



    return(<div className="flex flex-col items-center p-4 bg-gray-50 min-h-screen max-w-7xl">
        <SearchbarLarge changeFn={e => setSearchQuery(e.target.value)} submitFn={handleSearch} value={searchQuery} />
        <span>Provided by VNDB</span>
        <div className="flex justify-center flex-wrap mx-auto w-full">
            {searchResults.map((entry, i) => (
                <SearchEntry key={i} imageURL={entry.image} imageNSFW={entry.image_nsfw} title={entry.title} originalTitle={entry.original} lengthIndex={entry.length - 1} id={entry.id} originalLang={entry.orig_lang[0]}/>
            ))}
        </div>
        {existMoreResults && <Button clickFn={() => setSearchReady(true)} size="w-40 h-8" text="More Results" margin="m-3"/>}
    </div>);
}