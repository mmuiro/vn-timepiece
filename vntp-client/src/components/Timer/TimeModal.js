import React, { useCallback, useEffect, useLayoutEffect, useReducer, useState } from "react";
import { timeReducer } from "../../utils/hooks";
import Modal from "../Modal";
import TimeDisplay from "./TimeDisplay";
import Button from "../Buttons/Button";
import fetchWithAuth from "../../utils/fetchWithAuth";
import { FaWikipediaW } from "react-icons/fa";

export default function TimeModal({ timeInMs, showButtons, submitFn, show, close }) {
    const [displayTime, updateDisplayTime] = useReducer(timeReducer, timeInMs);
    const [showWarning, setShowWarning] = useState(false);

    useLayoutEffect(() => {
        updateDisplayTime({reset: true, time: timeInMs});
        setShowWarning(false);
    }, [show]);

    const handleSubmit = useCallback((e) => {
        e.preventDefault();
        if (!showWarning) {
            setShowWarning(true);
        } else {
            submitFn(displayTime);
        }
    }, [showWarning, displayTime, submitFn]);


    return <Modal show={show} close={close}>
        <div className="flex items-center justify-start w-full pb-2 mb-4 border-b-2 border-rose-500"><span className="text-2xl text-neutral-800">Modify Total Playtime</span></div>
        <TimeDisplay timeInMs={displayTime} showButtons={showButtons} updateTime={(v) => updateDisplayTime({amountInMs: v})} large={false} />
        <div className="flex justify-end items-center w-full mt-4 border-t-2 border-rose-500 pt-4">
            <Button size="w-32 h-8" margin="m-2" clickFn={handleSubmit}><span className="text-white font-medium">Confirm</span></Button>
            <Button size="w-32 h-8" margin="m-2" clickFn={close}><span className="text-white font-medium">Cancel</span></Button>
        </div>
        {showWarning && <div className="flex items-center justify-center my-2">
            <span className="text-pink-500 text-base">Modifying will save and end your current session. Confirm again to proceed.</span>
        </div>}
    </Modal>;
}