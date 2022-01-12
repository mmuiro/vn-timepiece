import React from "react";
import { msToTimeString, msToTimeStringFull } from "../../utils/timeUtil";
import { HiPlay, HiFlag, HiOutlineAdjustments } from "react-icons/hi";
import { CgUndo } from "react-icons/cg";
import { VscDebugContinue } from "react-icons/vsc";

export default function ActionCard({title, type, originalPlayTime=undefined, modifiedPlayTime=undefined, readingTime=undefined}) {
    let icon, textElement;
    switch (type) {
        case 'Start':
            icon = <HiPlay className="text-white w-10 h-10" />;
            textElement = <span>Started reading <p className="inline text-primary">{title}</p></span>;
            break;
        case 'Completion':
            icon = <HiFlag className="text-white" />;
            textElement = <span>Finished reading <p className="inline text-primary">{title}</p></span>;
            break;
        case 'Reading':
            icon = <VscDebugContinue className="text-white" />;
            textElement = <span>Read <p className="inline text-primary">{title}</p> for {msToTimeStringFull(readingTime)}</span>;
            break;
        case 'Modification':
            icon = <HiOutlineAdjustments className="text-white" />;
            textElement = <span>Changed play time for <p className="inline text-primary">{title}</p> from {msToTimeString(originalPlayTime)} to {msToTimeString(modifiedPlayTime)}</span>;
            break;
        case 'CompletionReversion':
            icon = <CgUndo className="text-white" />;
            textElement = <span>Marked <p className="inline text-primary">{title}</p> as incomplete</span>;
            break;
    }
    return (<div className="flex items-center justify-start rounded-lg w-full h-16 bg-white drop-shadow-md">
        <div className="flex items-center justify-center h-full w-16 bg-gradient-to-br from-rose-500 to-primary rounded-l-lg">{icon}</div>
        <div className="p-2 flex items-center justify-start ml-4 text-md subpixel-antialiased truncate md:whitespace-normal text-gray-800">{textElement}</div>
    </div>);
}