import { Text, Flex, Box, Button } from "@chakra-ui/react";

import { useStore, Algorithms } from "../../store";

const algorithms = ["quickSort", "mergeSort", "bubbleSort"];

export default function SelectAlgo() {
    const selected = useStore(store => store.state.selected);
    const { setSelected } = useStore(store => store.actions);
    return (
        <>
            <Text fontSize="2xl" align="center">
                Algorithms:
            </Text>
            <Flex mt="5" wrap="wrap" justifyContent="space-around" alignItems="center">
                {algorithms.map((val, i) => (
                    <Box p="1" key={i}>
                        <Button
                            variant="solid"
                            key={i}
                            onClick={() => setSelected(val as Algorithms)}
                        >
                            {val}
                        </Button>
                    </Box>
                ))}
            </Flex>
            <Text mt="2" fontSize="xl" align="center">
                Selected: {selected}
            </Text>
        </>
    );
}
