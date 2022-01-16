import React, { useCallback, useEffect, useReducer, useState } from "react";

function useOnExit(init, message, fn, ...args) {
    const [condition, setCondition] = useState(false);
    const handleUnload = useCallback((e) => {
        e.preventDefault();
        if (condition) {
            if (typeof fn === 'function') fn(...args);
            return e.returnValue = message;
        }
    }, [fn, condition, ...args]);
    useEffect(() => {
        window.addEventListener('beforeunload', handleUnload);
        return () => {
            window.removeEventListener('beforeunload', handleUnload);
        };
    }, [handleUnload])
    return [condition, setCondition];
}

function useOnClickOutside(ref, fn, ...args) {
    const handleClickOutside = useCallback((e) => {
        e.preventDefault();
        console.log(ref.current);
        if (ref.current !== null && !ref.current.contains(e.target)) fn(...args);
    },[fn, ref,...args]);
    useEffect(() => {
        window.addEventListener('click', handleClickOutside);
        return () => {
            window.removeEventListener('click', handleClickOutside);
        };
    }, [handleClickOutside]);
}

const timeReducer = (time, action) => {
    if (action.reset) {
        return action.time;
    }
    time += action.amountInMs;
    if (time < 0) time = 0;
    return time;
};

function useTimer() {
    const [totalPlayTime, updateTotalTime] = useReducer(timeReducer, 0);
    const [sessionPlayTime, updateSessionTime] = useReducer(timeReducer, 0);
    const [paused, setPaused] = useState(true);
    let intervalID = undefined;

    const tick = () => {
        updateSessionTime({amountInMs: 1000});
        updateTotalTime({amountInMs: 1000});
    }

    useEffect(() => {
        if (!paused) {
            intervalID = setInterval(tick, 1000);
        } else if (intervalID) {
            intervalID = undefined;
        }
        return () => {
            if (intervalID) clearInterval(intervalID);
        }
    }, [paused]);

    return [totalPlayTime, updateTotalTime, sessionPlayTime, updateSessionTime, paused, setPaused];
}

export { useOnExit, useOnClickOutside, useTimer, timeReducer };