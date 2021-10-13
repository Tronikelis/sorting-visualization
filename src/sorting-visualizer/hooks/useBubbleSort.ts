import { useState, useCallback, useEffect, useRef } from "react";

const sleep = (ms: number) => {
    return new Promise(resolve => {
        setTimeout(resolve, ms);
    });
};

interface useBubbleSortProps {
    array: number[];
    freq: number;
}

export const useBubbleSort = (props: useBubbleSortProps) => {
    const { array, freq } = props;

    const [left, setLeft] = useState(undefined as any as number);
    const [right, setRight] = useState(undefined as any as number);
    const [progress, setProgress] = useState(array);

    const freqRef = useRef(freq);

    const startSorting = useCallback(() => {
        const sort = async (array: number[]) => {
            for (let l = 0; l < array.length; l++) {
                for (let r = 0; r < array.length - l - 1; r++) {
                    if (array[r] > array[r + 1]) {
                        swap(array, r, r + 1);
                        setProgress(array);
                    }

                    setLeft(l);
                    setRight(r);

                    await sleep(freqRef.current);
                }
            }
        };

        function swap(array: number[], left: number, right: number) {
            [array[right], array[left]] = [array[left], array[right]];
        }

        sort([...array]);
    }, [array]);

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
