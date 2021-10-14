import { Flex } from "@chakra-ui/react";
import { useEffect } from "react";

import { useStore } from "../store";
import { VisController } from "../controllers";
import { useSortVis } from "../hooks";

export default function Visualization() {
    const array = useStore(store => store.state.array);
    const type = useStore(store => store.state.selected);
    const freq = useStore(store => store.state.freq);

    const { left, progress, right, start } = useSortVis({ array, freq, type });

    useEffect(() => {
        start();
    }, [start, type]);

    return (
        <Flex bg="#eceff4" w="100%" h="100%" p="10">
            <VisController array={progress} leftIdx={left} rightIdx={right} />
        </Flex>
    );
}
