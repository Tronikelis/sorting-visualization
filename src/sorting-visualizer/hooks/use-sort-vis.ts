import { useState, useCallback, useEffect, useRef } from "react";

import { Algorithms } from "../store";
import { bubbleSort, mergeSort } from "../controllers";

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

    const typeRef = useRef(type);
    const freqRef = useRef(freq);
    const arrayRef = useRef(array);

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
            case "quicksort":
                // quickSort();
                break;
        }
    }, [array, type]);

    const start = useCallback(() => {
        startSorting();
    }, [startSorting]);

    useEffect(() => {
        freqRef.current = freq;
    }, [freq]);
    useEffect(() => {
        typeRef.current = type;
    }, [type]);
    useEffect(() => {
        arrayRef.current = array;
    }, [array]);

    return {
        left,
        right,
        progress,
        start,
    };
};
