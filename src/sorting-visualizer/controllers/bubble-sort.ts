import { klona } from "klona";

import { useStore } from "../store";

interface BubbleSortArgs {
    array: number[];
    onIteration: (iteration: {
        progress: number[];
        right: number;
        left: number;
    }) => Promise<void>;
}

export const bubbleSort = ({ array, onIteration }: BubbleSortArgs) => {
    const swap = (array: number[], left: number, right: number) => {
        [array[right], array[left]] = [array[left], array[right]];
    };
    const sort = async (array: number[]) => {
        for (let l = 0; l < array.length; l++) {
            for (let r = 0; r < array.length - l - 1; r++) {
                if (array[r] > array[r + 1]) {
                    swap(array, r, r + 1);
                }
                // return if this isn't selected
                const { size, selected } = useStore.getState().state;
                if (selected !== "bubbleSort" || size !== array.length) return;

                await onIteration({
                    progress: array,
                    left: r,
                    right: r + 1,
                });
            }
        }
    };
    sort(klona(array));
};
