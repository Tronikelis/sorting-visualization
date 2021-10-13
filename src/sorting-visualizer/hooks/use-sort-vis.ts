import { useState, useCallback, useEffect, useRef } from "react";
import { klona } from "klona";

import { Algorithms } from "../store";

const sleep = (ms: number) => {
    return new Promise(resolve => {
        setTimeout(resolve, ms);
    });
};

interface useBubbleSortProps {
    array: number[];
    freq: number;
    type: Algorithms;
}

export const useSortVis = (props: useBubbleSortProps) => {
    const { array, freq, type } = props;

    const [left, setLeft] = useState(undefined as any as number);
    const [right, setRight] = useState(undefined as any as number);
    const [progress, setProgress] = useState(array);

    const typeRef = useRef(type);
    const freqRef = useRef(freq);
    const arrayRef = useRef(array);

    const startSorting = useCallback(() => {
        const bubbleSort = () => {
            const swap = (array: number[], left: number, right: number) => {
                [array[right], array[left]] = [array[left], array[right]];
            };
            const sort = async (array: number[]) => {
                for (let l = 0; l < array.length; l++) {
                    for (let r = 0; r < array.length - l - 1; r++) {
                        // if the sorting has changed then return out of this instance
                        if (type !== typeRef.current) return;
                        if (array.length !== arrayRef.current.length) return;

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
            sort(klona(array));
        };
        const mergeSort = () => {
            mergeSort(klona(array));

            // big thanks brother
            // https://github.com/humanwhocodes/computer-science-in-javascript/blob/master/algorithms/sorting/merge-sort-iterative/merge-sort-iterative.js
            function merge(left: number[], right: number[]) {
                var result = [];

                while (left.length > 0 && right.length > 0) {
                    if (left[0] < right[0]) {
                        result.push(left.shift());
                    } else {
                        result.push(right.shift());
                    }
                }

                result = result.concat(left).concat(right);

                left.splice(0, left.length);
                right.splice(0, right.length);

                return result;
            }

            async function mergeSort(items: number[]) {
                if (items.length < 2) {
                    return items;
                }

                var work = [],
                    i,
                    len;

                for (i = 0, len = items.length; i < len; i++) {
                    work.push([items[i]]);
                }
                work.push([]);

                for (var lim = len; lim > 1; lim = Math.floor((lim + 1) / 2)) {
                    for (var j = 0, k = 0; k < lim; j++, k += 2) {
                        // if the sorting has changed then return out of this instance
                        if (type !== typeRef.current) return;
                        if (array.length !== arrayRef.current.length) return;

                        work[j] = merge(work[k] as number[], work[k + 1] as number[]);

                        setProgress(work.reduce((prev, cur) => [...prev, ...cur]) as number[]);
                        setLeft(k);
                        setRight(j);
                        await sleep(freqRef.current * 2);
                    }
                    work[j] = [];
                }
            }
        };
        const quickSort = () => {
            // TODO
        };

        switch (type) {
            case "bubbleSort":
                bubbleSort();
                break;
            case "mergeSort":
                mergeSort();
                break;
            case "quicksort":
                quickSort();
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
