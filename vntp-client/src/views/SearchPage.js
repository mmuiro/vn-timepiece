import React, { useEffect } from "react";
import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import fetchWithAuth from "../utils/fetchWithAuth";
import Button from "../components/Buttons/Button";
import SearchbarLarge from "../components/SearchbarLarge";
import SearchEntryCard from "../components/Cards/SearchEntryCard";

export default function SearchPage() {
    const [searchParams, setSearchParams] = useSearchParams();
    const [searchQuery, setSearchQuery] = useState('');
    const [existMoreResults, setExistMoreResults] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [searchResults, setSearchResults] = useState([]);
    const [searchReady, setSearchReady] = useState(false);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setSearchResults([]);
        setCurrentPage(1);
        setSearchQuery(searchParams.get('query'));
        setExistMoreResults(false);
        if (searchParams.get('query')) {
            setLoading(true);
            setSearchReady(true);
        }
    }, [searchParams]);

    useEffect(() => {
        const performVNDBSearch = async (searchQuery) => {
            try {
                const url = new URL("api/search/fetch");
                url.searchParams.append("searchQuery", searchQuery);
                url.searchParams.append("page", currentPage);
                const res = await fetchWithAuth(url, 'GET');
                const json = await res.json();
                if (json.success) {
                    let { more, results } = json;
                    setExistMoreResults(more);
                    setCurrentPage(currentPage => currentPage + 1);
                    setSearchResults(searchResults => [...searchResults, ...results]);
                    setSearchReady(false);
                    setLoading(false);
                }
            } catch { }
        };
        if (searchReady && searchQuery !== null && searchQuery !== '') {
            performVNDBSearch(searchQuery);
        } 
    }, [searchReady]);

    const handleSearch = e => {
        e.preventDefault();
        if (searchQuery) setSearchParams({ query: searchQuery });
    };

    return(<div className="flex flex-col items-center p-4 bg-gray-100">
        <SearchbarLarge changeFn={e => setSearchQuery(e.target.value)} submitFn={handleSearch} value={searchQuery ? searchQuery : ''} />
        <span className="text-sm mt-2">Provided by <a href="https://vndb.org/" className="transition inline text-rose-500 no-underline hover:text-rose-300">VNDB</a> under the <a href="https://opendatacommons.org/licenses/odbl/1-0/" className="transition inline text-rose-500 no-underline hover:text-rose-300">Open Database License</a></span>
        <div className="flex justify-center flex-wrap mx-auto w-full">
            {loading ? <AiOutlineLoading3Quarters className="w-16 h-16 text-primary animate-spin m-3"/> :
            searchResults.map((entry, i) => (
                <SearchEntryCard key={i} imageLink={entry.image} imageNSFW={entry.image_nsfw} title={entry.title} originalTitle={entry.original} lengthIndex={entry.length - 1} id={entry.id} originalLang={entry.orig_lang[0]}/>
            ))}
        </div>
        {existMoreResults && 
            <Button clickFn={() => {if (searchParams.get('query')) setSearchReady(true) }} size="w-40 h-8" margin="m-3">
                <span className="text-white font-semibold">More Results</span>
            </Button>}
    </div>);
}
