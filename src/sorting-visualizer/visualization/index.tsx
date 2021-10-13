import { Flex } from "@chakra-ui/react";
import { useEffect } from "react";

import { useStore } from "../store";
import { VisController } from "../controllers";
import { useBubbleSort } from "../hooks";

export default function Visualization() {
    const array = useStore(store => store.state.array);
    const freq = useStore(store => store.state.freq);

    const { left, start, right, progress } = useBubbleSort({ array, freq });

    useEffect(() => {
        start();
    }, [start]);

    return (
        <Flex bg="#eceff4" w="100%" h="100%" p="10">
            <VisController array={progress} leftIdx={left} rightIdx={right} />
        </Flex>
    );
}
