import { Box, Text } from "@chakra-ui/react";

import { SelectAlgo, FreqChanger, SizeChanger } from "./components";

export default function SideBar() {
    return (
        <Box w="100%" h="100%" bgColor="#4c566a" p="10">
            <SelectAlgo />

            <Text fontSize="2xl" align="center" mt="5">
                Controls:
            </Text>
            
            <FreqChanger />
            <SizeChanger />
        </Box>
    );
}
