import create, { State, StateCreator } from "zustand";
import produce, { Draft } from "immer";

const immer =
    <T extends State>(config: StateCreator<T>): StateCreator<T> =>
    (set, get, api) =>
        config(
            (partial, replace) => {
                const nextState =
                    typeof partial === "function"
                        ? produce(partial as (state: Draft<T>) => T)
                        : (partial as T);
                return set(nextState, replace);
            },
            get,
            api
        );

export type Algorithms = "quicksort" | "mergeSort" | "bubbleSort";

interface Store {
    state: {
        selected: Algorithms
        array: number[];
        freq: number;
    }
    actions: {
        setSelected: (algorithm: Algorithms) => void;
        setArray: (fn: (arr: number[]) => number[]) => void;
        setFreq: (freq: number) => void
    }
}

export const useStore = create<Store>(
    immer(set => ({
        state: {
            selected: "bubbleSort",
            array: new Array(50).fill(0).map(() => Math.random()),
            freq: 20,
        },
        actions: {
            setArray: fn => set(store => {
                store.state.array = fn(store.state.array);
            }),
            setSelected: algorithm => set(store => {
                store.state.selected = algorithm;
            }),
            setFreq: freq => set(store => {
                store.state.freq = freq;
            }),
        },
    }))
);