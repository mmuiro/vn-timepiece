import React from "react";
import ReadingEntryCard from "./Cards/ReadingEntryCard";

export default function ReadingEntryList({ category, entryList }) {
    return <div className="flex flex-col w-full items-start">
        {entryList.length > 0 &&  <h1 className="ml-4 text-xl text-neutral-800 drop-shadow-sm">{category}</h1>}
        <div className="flex justify-start flex-wrap w-full">
            {entryList.map((entryData, i) => <ReadingEntryCard {...entryData} key={i} size="w-[22.5rem] h-max" />)}
        </div>
    </div>;
}