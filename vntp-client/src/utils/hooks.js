import React, { useCallback, useEffect, useReducer, useRef, useState } from "react";

function useOnExit(init, message, fn, ...args) {
    const [condition, setCondition] = useState(false);
    const handleUnload = useCallback((e) => {
        e.preventDefault();
        if (condition) {
            fn(...args);
            return e.returnValue = message;
        }
    }, [fn, condition, ...args]);
    useEffect(() => {
        window.addEventListener('beforeunload', handleUnload);
        return () => {
            // fn(...args);
            window.removeEventListener('beforeunload', handleUnload);
        }
    }, [fn, condition, ...args])
    return [condition, setCondition];
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
    let intervalID = useRef(undefined);

    const tick = () => {
        updateTotalTime({amountInMs: 1000});
        updateSessionTime({amountInMs: 1000});
    }

    useEffect(() => {
        if (!paused) {
            intervalID.current = setInterval(tick, 1000);
        } else if (intervalID) {
            intervalID.current = undefined;
        }

        return () => {
            if (intervalID.current) clearInterval(intervalID.current);
        }
    }, [paused]);

    return [totalPlayTime, updateTotalTime, sessionPlayTime, updateSessionTime, paused, setPaused];
}

export { useOnExit, useTimer };