import { Box } from "@chakra-ui/react";

import { SelectAlgo, FreqChanger } from "./components";

export default function SideBar() {
    return (
        <Box w="100%" h="100%" bgColor="#d8dee9" p="10">
            <SelectAlgo />
            <Box mt="10" />
            <FreqChanger />
        </Box>
    );
}
