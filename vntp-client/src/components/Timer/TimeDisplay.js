import React, { useCallback, useLayoutEffect, useState } from "react";
import { msToTime } from "../../utils/timeUtil";
import Button from "../Buttons/Button";
import { HiPlus, HiMinus } from "react-icons/hi";
import Dropdown from "../Dropdown";

const MS_PER = {
    seconds: 1000,
    minutes: 1000 * 60,
    hours: 1000 * 60 * 60
};

export default function TimeDisplay({ timeInMs, showButtons, updateTime, large=true }) {
    const [timeAmounts, setTimeAmounts] = useState({ hours: 0, minutes: 0, seconds: 0 });
    let [timeIncrements, setTimeIncrements] = useState({ hours: 1, minutes: 1, seconds: 1});

    useLayoutEffect(() => {
        setTimeAmounts(msToTime(timeInMs));
    }, [timeInMs]);

    const buttonDisplay = (key) => {
        if (!MS_PER[key]) return <></>;
        return (<>
            <Button size={large ? "h-8 w-8 mx-1.5" : "h-6 w-6 mx-1"} clickFn={() => updateTime(MS_PER[key] * timeIncrements[key])}><HiPlus className={`text-white ${large ? "stroke-2" : "stroke-1"}`}/></Button>
            <Button size={large ? "h-8 w-8 mx-1.5" : "h-6 w-6 mx-1"} clickFn={() => updateTime(-MS_PER[key] * timeIncrements[key])}><HiMinus className={`text-white ${large ? "stroke-2" : "stroke-1"}`}/></Button>
            <Dropdown options={[1, 5, 10]} width={large ? "w-12" : "w-9"} height={large ? "h-8" : "h-6"} value={timeIncrements[key]} setValue={(v) => {
                let newIncrements = { hours: timeIncrements.hours, minutes: timeIncrements.minutes, seconds: timeIncrements.seconds };
                newIncrements[key] = v;
                setTimeIncrements(newIncrements)}}/>
        </>);
    };

    return (
        <div className="grid grid-rows-[auto_auto] grid-cols-5 justify-items-center auto-rows-min text-neutral-800">
            <span className={`row-start-1 col-start-1 col-span-1 ${large ? "text-9xl" : "text-7xl"}`}>{timeAmounts.hours.toString().padStart(2, '0')}</span>
            <span className={`row-start-1 col-start-2 col-span-1 ${large ? "text-9xl" : "text-7xl"}`}>∶</span>
            <span className={`row-start-1 col-start-3 col-span-1 ${large ? "text-9xl" : "text-7xl"}`}>{timeAmounts.minutes.toString().padStart(2, '0')}</span>
            <span className={`row-start-1 col-start-4 col-span-1 ${large ? "text-9xl" : "text-7xl"}`}>∶</span>
            <span className={`row-start-1 col-start-5 col-span-1 ${large ? "text-9xl" : "text-7xl"}`}>{timeAmounts.seconds.toString().padStart(2, '0')}</span>
            <div className="row-start-2 col-start-1 col-span-1 text-xl">
                <div className="flex flex-col items-center justify-center">
                    <span className="my-2">Hours</span>
                    {showButtons && <div className="flex justify-between mt-3 items-center">
                        {buttonDisplay('hours')}
                    </div> }
                </div>
            </div>
            <div className="row-start-2 col-start-3 col-span-1 text-xl">
                <div className="flex flex-col items-center justify-start">
                    <span className="my-2">Minutes</span>
                    {showButtons && <div className="flex justify-between mt-3">
                        {buttonDisplay('minutes')}
                    </div>}
                </div>
            </div>
            <div className="row-start-2 col-start-5 col-span-1 text-xl">
                <div className="flex flex-col items-center justify-start">
                    <span className="my-2">Seconds</span>
                    {showButtons && <div className="flex justify-between mt-3">
                        {buttonDisplay('seconds')}
                    </div>}
                </div>
            </div>
        </div>
    );
}