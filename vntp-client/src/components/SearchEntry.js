import React from "react";

export default function SearchEntry({imageURL, imageNSFW, title, originalTitle}) {
    return <div className="flex items-start bg-white rounded-lg h-fit drop-shadow-sm m-2 w-[32rem]">
        {imageNSFW ? <div className="h-32 w-32">NSFW</div> : <img src={imageURL} className="m-2 w-32" />}
        <span className="whitespace-normal font-medium text-lg mx-4">{title + (originalTitle != null ? ' / ' + originalTitle : "")}</span>
    </div>
}