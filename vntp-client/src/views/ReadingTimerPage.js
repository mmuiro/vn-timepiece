import React, { useContext, useEffect, useState, useCallback, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { AuthContext } from "../context/auth";
import fetchWithAuth from "../utils/fetchWithAuth";
import { msToTimeDisplayString } from "../utils/timeUtil";
import Button from "../components/Buttons/Button";
import { BsFillPlayFill, BsPauseFill } from "react-icons/bs";
import { useOnExit, useOnNavigateAway, useTimer } from "../utils/hooks";

const eventWrapper = (fn) => {
    return (e, ...args) => {
        e.preventDefault();
        return fn(...args);
    };
}

export default function ReadingTimerPage() {
    const { vndbID } = useParams();
    const { authState, updateSignedIn } = useContext(AuthContext);
    const [totalPlayTime, updateTotalTime, sessionPlayTime, updateSessionTime, paused, setPaused] = useTimer();
    const [entryState, setEntryState] = useState({title: '', completed: undefined});
    const [loading, setLoading] = useState(true);
    const [sessionStarted, setSessionStarted] = useState(false);
    const unmounting = useRef(false);
    const navigate = useNavigate();

    const endSession = useCallback(async () => {
        const res = await fetchWithAuth('/api/reader/addAction', 'POST', JSON.stringify({
            vndbID,
            type: 'Reading',
            readingTime: sessionPlayTime
        }));
        const json = await res.json();
        if (json.success) {
            alert(json.message);
        } else {
            alert(json.message);
        }
    }, [sessionPlayTime]);

    const completeVN = useCallback(async () => {
        if (sessionStarted) endSession();
        const res = await fetchWithAuth('/api/reader/addAction', 'POST', JSON.stringify({
            vndbID,
            type: 'Completion'
        }));
        const json = await res.json();
        if (json.success) {
            alert(json.message);
            setSessionStarted(false);
            navigate('/');
        }
    }, [vndbID, setSessionStarted, sessionStarted, endSession]);

    const revertVNCompletion = useCallback(async () => {
        const res = await fetchWithAuth('/api/reader/addAction', 'POST', JSON.stringify({
            vndbID,
            type: 'CompletionReversion'
        }));
        const json = await res.json();
        if (json.success) {
            alert(json.message);
            navigate('/');
        }
    }, [vndbID]);

    const [saveOnExit, setSaveOnExit] = useOnExit(false, "Ended your session.", endSession);

    const startSession = useCallback((e) => {
        e.preventDefault();
        setSessionStarted(true);
        setPaused(false);
        setSaveOnExit(true);
    }, [setSessionStarted, setPaused]);

    useEffect(() => {
        if (authState.signedIn === false) navigate("/login");
    }, [authState])

    useEffect(() => {
        const initTimer = async () => {
            const url = new URL(process.env.REACT_APP_API_URL + "/api/reader/view");
            url.searchParams.append("id", vndbID);
            const res = await fetchWithAuth(url, 'GET');
            const json = await res.json();
            if (json.success) {
                updateTotalTime({reset: true, time: json.readingEntryData.totalPlayTime});
                setEntryState({ title: json.readingEntryData.title, completed: json.readingEntryData.completed });
                setLoading(false);
            } else {
                updateSignedIn();
            }
        };
        initTimer();
        return () => {
            unmounting.current = true;
        }
    }, []);

    useEffect(() => {
        return () => {
            if (sessionStarted && unmounting.current) {
                endSession();
                alert("Ended your session."); 
            }
        }
    }, [sessionStarted, endSession])

    return (<div className="flex flex-col items-center px-8 py-12 bg-gray-50 min-h-screen">
        {loading ? <AiOutlineLoading3Quarters className="w-16 h-16 text-primary animate-spin m-3"/> : 
        <>
            <span>{entryState.title}</span>
            {!entryState.completed && <span>{msToTimeDisplayString(sessionPlayTime)}</span>}
            <span>{msToTimeDisplayString(totalPlayTime)}</span>
            {!entryState.completed ? 
                (!sessionStarted ? 
                    <Button size="w-40 h-8" margin="m-4" clickFn={startSession}><span className="text-white font-medium">Start Session</span></Button> :
                    <>
                        {paused ? 
                            <Button size="w-16 h-16" margin="m-4" rounding="rounded-full" clickFn={eventWrapper(() => setPaused(false))}><BsFillPlayFill className="text-white w-[60%] h-[60%] ml-0.5"/></Button> :
                            <Button size="w-16 h-16" margin="m-4" rounding="rounded-full" clickFn={eventWrapper(() => setPaused(true))}><BsPauseFill className="text-white w-[60%] h-[60%]"/></Button>
                        }
                        <Button size="w-40 h-8" margin="m-4" clickFn={eventWrapper(() => navigate('/'))}><span className="text-white font-medium">End Session</span></Button>
                        <Button size="w-40 h-8" margin="m-4" clickFn={eventWrapper(completeVN)}><span className="text-white font-medium">Mark as Completed</span></Button>
                    </>) : 
                <Button size="w-40 h-8" margin="m-4" clickFn={eventWrapper(revertVNCompletion)}><span className="text-white font-medium">Mark as Incomplete</span></Button>
            }
        </>}
    </div>);

}