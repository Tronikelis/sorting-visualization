import { ChakraProvider, Flex, Box } from "@chakra-ui/react";

import SideBar from "./sidebar";
import Visualization from "./visualization";

export default function SortingVisualizer() {
    return (
        <ChakraProvider>
            <Flex w="100vw" h="100vh">

                <Box flex="0.3">
                    <SideBar />
                </Box>
                <Box flex="1">
                    <Visualization />
                </Box>
                
            </Flex>
        </ChakraProvider>
    );
}