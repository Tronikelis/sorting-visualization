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
    let newArr = klona(array);
    sort(newArr, 0, newArr.length - 1);

    async function sort(array: number[], left: number, right: number) {
        // if it is less than one then sorting is useless
        if (array.length <= 1) return;

        // partition the array and get the (middle point where the partition stopped)
        const mid = await partition(array, left, right);
        if (!mid) return;

        // sort the left part, without the pivot
        if (left < mid - 1) await sort(array, left, mid - 1);
        // sort the right part, with the pivot
        if (right > mid) await sort(array, mid, right);
    }

    function swap(array: number[], left: number, right: number) {
        [array[left], array[right]] = [array[right], array[left]];
    }

    async function partition(array: number[], left: number, right: number) {
        // take the pivot of the array chunk
        const pivot = array[Math.floor((left + right) / 2)];
        // console.log({ pivot, left, right });
        let l = left;
        let r = right;

        // while left side has bigger numbers than the right side
        while (l <= r) {
            // add one to the left if we do not need to swap it
            while (array[l] < pivot) {
                l++;
            }
            // minus one to the right if we do no need to swap it
            while (array[r] > pivot) {
                r--;
            }
            // if left side currently has a bigger number than the right then swap it
            if (l <= r) {
                swap(array, l, r);
                l++;
                r--;
            }

            await onIteration({
                progress: array,
                left: l,
                right: r,
            });

            // return if this isn't selected
            const { size, selected } = useStore.getState().state;
            if (selected !== "quickSort" || size !== array.length) return;
        }
        // return a new index (middle part usually)
        return l;
    }
};
