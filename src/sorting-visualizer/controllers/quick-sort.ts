import { klona } from "klona";

import { useStore } from "../store";

interface QuickSortArgs {
    array: number[];
    onIteration: (iteration: {
        progress: number[];
        right: number;
        left: number;
    }) => Promise<void>;
}

// https://learnersbucket.com/examples/algorithms/quick-sort-iterative/
export const quickSort = async ({ array, onIteration }: QuickSortArgs) => {
    const iterativeQuickSort = async (arr: number[]) => {
        const swap = (arr: number[], left: number, right: number) => {
            [arr[left], arr[right]] = [arr[right], arr[left]];
        };

        const partitionHigh = async (arr: number[], low: number, high: number) => {
            //Pick the first element as pivot
            let pivot = arr[high];
            let i = low;

            //Partition the array into two parts using the pivot
            for (let j = low; j < high; j++) {
                if (arr[j] <= pivot) {
                    swap(arr, i, j);
                    i++;
                }
                // return if this isn't selected
                const { size, selected } = useStore.getState().state;
                if (selected !== "quickSort" || size !== array.length) return;

                await onIteration({
                    left: i,
                    right: j,
                    progress: arr,
                });
            }

            swap(arr, i, high);

            await onIteration({
                left: i,
                right: high,
                progress: arr,
            });
            //Return the pivot index
            return i;
        };
        //Stack for storing start and end index
        let stack: any = [];

        //Get the start and end index
        let start = 0;
        let end = arr.length - 1;

        //Push start and end index in the stack
        stack.push({ x: start, y: end });

        //Iterate the stack
        while (stack.length) {
            //Get the start and end from the stack
            const { x, y } = stack.shift();

            //Partition the array along the pivot
            const PI = await partitionHigh(arr, x, y);
            if (!PI) return;

            //Push sub array with less elements than pivot into the stack
            if (PI - 1 > x) {
                stack.push({ x: x, y: PI - 1 });
            }

            //Push sub array with greater elements than pivot into the stack
            if (PI + 1 < y) {
                stack.push({ x: PI + 1, y: y });
            }
        }
    };
    iterativeQuickSort(klona(array));
};
