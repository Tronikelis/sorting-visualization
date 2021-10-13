import { ChakraProvider, Flex, Box, extendTheme, ThemeConfig } from "@chakra-ui/react";

import SideBar from "./sidebar";
import Visualization from "./visualization";

const config: ThemeConfig = {
    initialColorMode: "dark",
    useSystemColorMode: false,
};

const theme = extendTheme({ config });

export default function SortingVisualizer() {
    return (
        <ChakraProvider theme={theme}>
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
