import { makeAutoObservable, runInAction } from 'mobx';
import { useEffect, useRef, useState } from 'react';
import { RootStore } from './rootStore';

export function transformToDate(valueMS: number): string {
    let hours = valueMS / 1000 / 60 / 60;
    let minutes = (hours % 1) * 60;
    let seconds = (minutes % 1) * 60;

    seconds = Math.round(seconds);
    const secondsText = seconds > 9 ? `${seconds}` : `0${seconds}`;

    minutes = Math.trunc(minutes);
    const minutesText = minutes > 9 ? `${minutes}` : `0${minutes}`;

    hours = Math.trunc(hours);
    if (hours >= 1) {
        const hoursText = hours > 9 ? `${hours}` : `0${hours}`;
        return `${hoursText}:${minutesText}:${secondsText}`;
    }
    return `${minutesText}:${secondsText}`;
}

// Time measures in ms
export function useTimer(step = 1000) {
    const [isStarted, setIsStarted] = useState(false);
    const [time, setTime] = useState(0);
    const timeoutRef = useRef(null);

    useEffect(() => {
        if (isStarted === true) {
            timeoutRef.current = setTimeout(() => {
                setTime(time - step);
                if (time <= 0) {
                    stop();
                    return;
                }
            }, step);
        }
    }, [isStarted, time]);

    function start(time: number) {
        setTime(time);
        setIsStarted(true);
    }

    function pause() {
        if (timeoutRef) {
            setIsStarted(false);
            clearTimeout(timeoutRef.current);
        }
    }

    function stop() {
        if (timeoutRef) {
            setIsStarted(false);
            clearTimeout(timeoutRef.current);
        }
        setTime(0);
    }

    return {
        start,
        pause,
        stop,
        time,
    };
}
