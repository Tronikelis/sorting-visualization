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

export type Algorithms = "quickSort" | "mergeSort" | "bubbleSort";

interface Store {
    state: {
        selected: Algorithms;
        array: number[];
        freq: number;
        size: number;
    };
    actions: {
        setSelected: (algorithm: Algorithms) => void;
        setArray: (array: number[]) => void;
        setFreq: (freq: number) => void;
        setSize: (size: number) => void;
    };
}

export const useStore = create<Store>(
    immer(set => ({
        state: {
            selected: "quickSort",
            array: new Array(100).fill(0).map(() => Math.random() * 100),
            freq: 20,
            size: 100,
        },
        actions: {
            setArray: array =>
                set(store => {
                    store.state.array = array;
                }),
            setSelected: algorithm =>
                set(store => {
                    store.state.selected = algorithm;
                }),
            setFreq: freq =>
                set(store => {
                    store.state.freq = freq;
                }),
            setSize: size =>
                set(store => {
                    store.state.size = size;
                }),
        },
    }))
);
