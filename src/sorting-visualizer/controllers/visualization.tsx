import { Flex, Box } from "@chakra-ui/react";

interface VisControllerProps {
    array: number[];
    leftIdx?: number;
    rightIdx?: number;
}

export default function VisController(props: VisControllerProps) {
    const { array, leftIdx, rightIdx } = props;
    return (
        <Flex w="100%" h="100%" alignItems="flex-end" justifyContent="center">
            {array.map((val, i) => (
                <Box
                    key={i}
                    w="100%"
                    h={(val * 100).toFixed(3) + "%"}
                    bgColor={i === leftIdx || i === rightIdx ? "#5e81ac" : "#2e3440"}
                />
            ))}
        </Flex>
    );
}
