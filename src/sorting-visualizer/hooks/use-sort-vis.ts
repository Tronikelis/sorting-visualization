import { useState, useCallback, useEffect, useRef } from "react";

import { Algorithms } from "../store";
import { bubbleSort, mergeSort, quickSort } from "../controllers";

const sleep = (ms: number) => {
    return new Promise(resolve => {
        setTimeout(resolve, ms);
    });
};

interface useSortVisProps {
    array: number[];
    freq: number;
    type: Algorithms;
}

export const useSortVis = (props: useSortVisProps) => {
    const { array, freq, type } = props;

    const [left, setLeft] = useState(undefined as any as number);
    const [right, setRight] = useState(undefined as any as number);
    const [progress, setProgress] = useState(array);

    const freqRef = useRef(freq);

    const startSorting = useCallback(() => {
        const onIteration = async ({
            left,
            right,
            progress,
        }: {
            left: number;
            right: number;
            progress: number[];
        }) => {
            setLeft(left);
            setRight(right);
            setProgress(progress);

            await sleep(freqRef.current);
        };

        switch (type) {
            case "bubbleSort":
                bubbleSort({ array, onIteration });
                break;
            case "mergeSort":
                mergeSort({ array, onIteration });
                break;
            case "quickSort":
                quickSort({ array, onIteration });
                break;
        }
    }, [array, type]);

    const start = useCallback(() => {
        startSorting();
    }, [startSorting]);

    useEffect(() => {
        freqRef.current = freq;
    }, [freq]);

    return {
        left,
        right,
        progress,
        start,
    };
};
