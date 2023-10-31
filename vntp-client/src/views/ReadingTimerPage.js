import React, { useContext, useEffect, useState, useCallback, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { AuthContext } from "../context/auth";
import fetchWithAuth from "../utils/fetchWithAuth";
import { msToTimeDisplayString } from "../utils/timeUtil";
import Button from "../components/Buttons/Button";
import { BsFillPlayFill, BsPauseFill } from "react-icons/bs";
import { useOnExit, useOnNavigateAway, useTimer } from "../utils/hooks";
import TimeDisplay from "../components/Timer/TimeDisplay";
import TimeModal from "../components/Timer/TimeModal";
import Modal from "../components/Modal";

const SESSION_TIME_THRESHOLD = 5 * 60 * 1000

const getTomorrow = () => {
    return new Date(new Date((new Date()).setDate((new Date()).getDate() + 1)).toLocaleDateString());
}

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
    const [showTimeModal, setShowTimeModal] = useState(false);
    const [showAlertModal, setShowAlertModal] = useState(false);
    const [shouldEnd, setShouldEnd] = useState(false);
    const unmounting = useRef(false);
    const navigate = useNavigate();
    let timeoutID;

    const endSession = useCallback(async () => {
        const res = await fetchWithAuth("api/reader/addAction", "POST", JSON.stringify({
            vndbID,
            type: 'Reading',
            readingTime: sessionPlayTime
        }));
        const json = await res.json();
        if (!json.success) {
            updateSignedIn();
        }
    }, [sessionPlayTime]);

    const modifyTotalPlayTime = useCallback(async (modifiedPlayTime) => {
        if (sessionStarted && sessionPlayTime >= SESSION_TIME_THRESHOLD) await endSession();
        const res = await fetchWithAuth("/api/reader/addAction", 'POST', JSON.stringify({
            vndbID,
            type: 'Modification',
            modifiedPlayTime
        }));
        const json = await res.json();
        if (json.success) {
            setSessionStarted(false);
            navigate('/');
        } else {
            updateSignedIn();
        }
    }, [endSession, sessionStarted, setSessionStarted]);

    const completeVN = useCallback(async () => {
        if (sessionStarted && sessionPlayTime >= SESSION_TIME_THRESHOLD) await endSession();
        const res = await fetchWithAuth('/api/reader/addAction', 'POST', JSON.stringify({
            vndbID,
            type: 'Completion'
        }));
        const json = await res.json();
        if (json.success) {
            setSessionStarted(false);
            navigate('/');
        } else {
            updateSignedIn();
        }
    }, [setSessionStarted, sessionStarted, endSession]);

    const revertVNCompletion = useCallback(async () => {
        const res = await fetchWithAuth('/api/reader/addAction', 'POST', JSON.stringify({
            vndbID,
            type: 'CompletionReversion'
        }));
        const json = await res.json();
        if (json.success) {
            navigate('/');
        } else {
            updateSignedIn();
        }
    }, [vndbID]);

    const [notifyOnExit, setNotifyOnExit] = useOnExit(false, "Ended your session.");

    const startSession = useCallback((e) => {
        e.preventDefault();
        setSessionStarted(true);
        setPaused(false);
        timeoutID = setTimeout(() => {
            setShouldEnd(true);
        }, getTomorrow() - (new Date()));
    }, []);

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
                navigate('/');
            }
        };
        initTimer();
        return () => {
            unmounting.current = true;
            clearTimeout(timeoutID);
        }
    }, []);

    // useEffects for auto-saving sessions when leaving the page / at midnight

    useEffect(() => {
        const resetSession = () => {
            console.log(getTomorrow() - new Date());
            setSessionStarted(false);
            updateSessionTime({reset:true, time:0});
            setPaused(true);
            setShowTimeModal(false);
            setShowAlertModal(true);
            if (sessionStarted && sessionPlayTime >= SESSION_TIME_THRESHOLD) endSession();
        };
        if (shouldEnd && sessionStarted) {
            resetSession();
        }
        return () => {
            if (shouldEnd) setShouldEnd(false);
        }
    }, [shouldEnd, endSession, sessionStarted, sessionPlayTime]);

    useEffect(() => {
        if (sessionStarted && sessionPlayTime >= SESSION_TIME_THRESHOLD) { 
            setNotifyOnExit(true); 
        } else { setNotifyOnExit(false); }
    }, [sessionStarted, sessionPlayTime, setNotifyOnExit])

    useEffect(() => {
        return () => {
            if (sessionStarted && sessionPlayTime >= SESSION_TIME_THRESHOLD && unmounting.current) {
                endSession();
                alert("Ended your session."); 
            }
        }
    }, [sessionStarted, endSession, sessionPlayTime])

    return (<div className="flex flex-col items-center px-8 py-8 bg-gray-100">
        {loading ? <AiOutlineLoading3Quarters className="w-16 h-16 text-primary animate-spin m-3"/> : 
        <>
            <span className="text-lg mb-2">{entryState.title}</span>
            {!entryState.completed ? 
                <>
                    <span className="border-b-2 border-primary">Session Time</span>
                    <TimeDisplay timeInMs={sessionPlayTime} showButtons={sessionStarted && paused} updateTime={(v) => {
                        let change = Math.max(v, -sessionPlayTime);
                        updateSessionTime({amountInMs: change});
                        updateTotalTime({amountInMs: change});
                    }}/>
                    <span className="border-b-2 border-primary mt-2">Total Time</span>
                    <span className="text-7xl my-4">{msToTimeDisplayString(totalPlayTime)}</span>
                    {paused && <>
                        <Button clickFn={() => setShowTimeModal(true)} size="w-40 h-8" margin="m-4"><span className="text-white font-medium">Modify</span></Button>
                        <TimeModal show={showTimeModal} close={() => setShowTimeModal(false)} submitFn={modifyTotalPlayTime} timeInMs={totalPlayTime} showButtons={true} update>
                            <span>hi</span>
                        </TimeModal>
                    </>}
                </>
                 : <TimeDisplay timeInMs={totalPlayTime} showButtons={false}/>
            }
            {!entryState.completed ? 
                (!sessionStarted ? 
                    <Button size="w-40 h-8" margin="m-4" clickFn={startSession}><span className="text-white font-medium">Start Session</span></Button> :
                    <>
                        {paused ? 
                            <Button size="w-16 h-16" margin="m-4" rounding="rounded-full" clickFn={eventWrapper(() => setPaused(false))}><BsFillPlayFill className="text-white w-[60%] h-[60%] ml-0.5"/></Button> :
                            <Button size="w-16 h-16" margin="m-4" rounding="rounded-full" clickFn={eventWrapper(() => setPaused(true))}><BsPauseFill className="text-white w-[60%] h-[60%]"/></Button>
                        }
                        <div className="flex">
                            <Button size="w-48 h-8" margin="m-4" clickFn={eventWrapper(() => navigate('/'))}><span className="text-white font-medium">End Session</span></Button>
                            <Button size="w-48 h-8" margin="m-4" clickFn={eventWrapper(completeVN)}><span className="text-white font-medium">Mark as Completed</span></Button>
                        </div>
                    </>) : 
                <Button size="w-40 h-8" margin="m-4" clickFn={eventWrapper(revertVNCompletion)}><span className="text-white font-medium">Mark as Incomplete</span></Button>
            }
            {showAlertModal && <Modal show={showAlertModal} close={() => setShowAlertModal(false)}>
                <div className="flex flex-col items-center ">
                    <span className="text-rose-500 mb-6">Your session was saved and ended. Please start a new one.</span>
                    <Button size="w-32 h-8" clickFn={() => setShowAlertModal(false)}><span className="text-white font-medium">Close</span></Button>
                </div>
            </Modal>}
        </>}
    </div>);

}
