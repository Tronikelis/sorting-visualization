import { Box, Text, Slider, SliderTrack, SliderFilledTrack, SliderThumb } from "@chakra-ui/react";

import { useStore } from "../../store";

export default function SizeChanger() {
    const { setSize, setArray } = useStore(store => store.actions);
    const size = useStore(store => store.state.size);
    
    const onChange = (val: number) => {
        setSize(val);
        setArray(new Array(val).fill(0).map(() => Math.random()));
    };

    return (
        <Box w="100%">
            <Text fontSize="2xl">
                Array size: {" "} {size}
            </Text>
            <Slider
                w="100%"
                defaultValue={100}
                min={3}
                max={800}
                onChangeEnd={val => onChange(val)}
            >
                <SliderTrack>
                    <SliderFilledTrack />
                </SliderTrack>
                <SliderThumb />
            </Slider>
        </Box>
    );
}