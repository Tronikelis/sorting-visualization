import { Flex, Box, Text, Button } from "@chakra-ui/react";

import { useStore, Algorithms } from "../store";

const algorithms = ["quickSort", "mergeSort", "bubbleSort"];

export default function SideBar() {
    const selected = useStore(store => store.state.selected);
    const { setSelected } = useStore(store => store.actions);

    return (
        <Box w="100%" h="100%" bgColor="#d8dee9" p="10">
            <Text fontSize="2xl" align="center">
                Algorithms:
            </Text>

            <Flex 
                mt="5" 
                wrap="wrap" 
                justifyContent="space-around" 
                alignItems="center"
            >
                {algorithms.map((val, i) => (
                    <Box p="1">
                        <Button 
                            variant="ghost" 
                            key={i} 
                            onClick={() => setSelected(val as Algorithms)}
                        >
                            {val}
                        </Button>
                    </Box>
                ))}
            </Flex>

            <Text mt="10" fontSize="xl" align="center">
                Selected: {" "} {selected}
            </Text>
        </Box>
    );
}
