import { SyntheticEvent, useState } from "react";

export enum CounterMode {
    TEXT = 'text',
    INPUT = 'input',
}

type Props = {
    initialValue?: number;
    step?: number;
    limits?: {max: number, min: number}; 
}

type ReturnObj = {
    value: number;
    addValue: (e: SyntheticEvent) => void;
    removeValue: (e: SyntheticEvent) => void;
    setValue: (value: number) => void;
}

export function useCounter({ initialValue = 0, step = 1, limits}: Props): ReturnObj {
    const [value, setValue] = useState<number>(initialValue);
    
    function addValue() {
        if (limits) {
            if (limits.max !== undefined && value + step <= limits.max) {
                setValue((val) => val + step)
            }
        } else {
            setValue((val) => val + step)
        }
    }

    function removeValue() {
        if (limits) {
            if (limits.min !== undefined && value - step >= limits.min) {
                setValue((val) => val - step)
            }
        } else {
            setValue((val) => val - step)
        }
    }

    return {
        addValue,
        removeValue,
        setValue,
        value,
    }
}

export function transformToDate(valueMS: number): string {
    let hours = valueMS / 1000 / 60 / 60;  
    let minutes = hours % 1 * 60;
    let seconds = minutes % 1 * 60;
    
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

const STORAGE_KEY_TRAINING = 'training';

type Training = {
    name: string;
    sets: number;
    workTime: number;
    restTime: number;
}

export function saveTraining(training: Training) {
    localStorage.setItem(STORAGE_KEY_TRAINING, String(training));
}

export enum CounterType {
    NUMBER = 'number',
    DATE = 'date',
}