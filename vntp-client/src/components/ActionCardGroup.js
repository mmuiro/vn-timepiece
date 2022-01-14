import React, { Fragment } from "react";
import ActionCard from "./Cards/ActionCard";
import ConnectorLine from "./ConnectorLine";

export default function ActionCardGroup({date, actionList, connector}) {
    return (<div className="flex w-full h-fit justify-start mb-28">
        <div className="w-[24%] flex items-center justify-start">
            <span className="text-lg text-gray-700 drop-shadow-sm">{date}</span>
        </div>
        <div className="relative flex flex-col items-center justify-start flex-grow h-fit">
            {
                actionList.map((action, i) => <Fragment key={-i}><ActionCard {...action}/>
                {(i < actionList.length - 1) && <ConnectorLine strokeColor="stroke-gray-200" strokeWidth="stroke-[4]" length="h-6" fillColor="fill-gray-200"/>}</Fragment>)
            }
            {connector && <ConnectorLine position="absolute -bottom-[6.875rem]" strokeColor="stroke-gray-200" strokeWidth="stroke-1" length="h-24" transition={true} fillColor="fill-gray-200"/>}
        </div>
    </div>);
}