import { klona } from "klona";

import { useStore } from "../store";

interface MergeSortArgs {
    array: number[];
    onIteration: (iteration: {
        progress: number[];
        right: number;
        left: number;
    }) => Promise<void>;
}

// https://stackoverflow.com/questions/64609030/is-this-iterative-implementation-of-merge-sort-correct
export const mergeSort = async ({ array: immutable, onIteration }: MergeSortArgs) => {
    let array = klona(immutable) as any as number[][];

    for (let i = 0; i < array.length; i++) {
        array[i] = [array[i] as any];
    }
    for (let step = 1; step < array.length; step *= 2) {
        for (let i = 0; i + step < array.length; i += step * 2) {
            array[i] = await mergeTwoSortedArrays(array[i], array[i + step], array);
            delete array[i + step];

            // return if this isn't selected
            const { size, selected } = useStore.getState().state;
            if (selected !== "mergeSort" || size !== immutable.length) return;
        }
    }
    await onIteration({
        left: 0,
        right: 0,
        progress: array[0],
    });

    async function mergeTwoSortedArrays(a: number[], b: number[], original: number[][]) {
        let merged = [];
        let i = 0,
            j = 0;
        while (i < a.length || j < b.length) {
            merged.push(i < a.length && (j >= b.length || a[i] < b[j]) ? a[i++] : b[j++]);

            await onIteration({
                left: i,
                right: j + a.length,
                progress: original.reduce((prev, cur) => [...prev, ...cur]),
            });
        }
        return merged;
    }
};
