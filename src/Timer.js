import React, { useEffect, useState } from 'react';
import "./TimerCss.css";
const Timer = () => {
    const [currentTime, setCurrentTime] = useState(new Date().toLocaleTimeString());
    const [second, setSecond] = useState(0);
    const [minute, setMinute] = useState(0);
    const [running, setRunning] = useState(true);
    const [start, setStart]=useState(false);
    let timer;

    useEffect(() => {
        if (running && start) {
            timer = setInterval(() => {
                setSecond((prevSecond) => {
                    if (prevSecond === 59) {
                        setMinute((prevMinute) => prevMinute + 1);
                        return 0;
                    }
                    return prevSecond + 1;
                });
            }, 1000);
        }

        return () => clearInterval(timer);
    }, [running,start]);


    // for handle current time
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentTime(new Date().toLocaleTimeString());
        }, 1000);

        return () => clearInterval(interval)
    }, []);

    const restart = () => {
        setMinute(0);
        setSecond(0);
        setStart(false);
    }
    const stop = () => {
        setRunning(!running);
    }
    return (
        <>
            <div className='mainDiv'>
            <h5>Current Time: {currentTime}</h5>
            <h1 className='mainHeading'>Stop Watch</h1>
            <p>{minute < 10 ? '0' + minute : minute}:{second < 10 ? '0' + second : second}</p>
            {start==false?(
                <button className='mainBtn' onClick={()=>{setStart(!start)}}>Start</button>
            ):(
                <button className='mainBtn' onClick={restart}>Restart</button>
            )}
            <button className='mainBtn' onClick={stop}>{running ? 'Stop' : 'Resume'}</button>
            </div>
        </>
    )

};

export default Timer;