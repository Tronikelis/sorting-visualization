import {
    Slider, SliderFilledTrack, SliderThumb, SliderTrack, Text, Box,
} from "@chakra-ui/react";

import { useStore } from "../../store";

export default function FreqChanger() {
    const { setFreq } = useStore(store => store.actions);
    const freq = useStore(store => store.state.freq);

    return (
        <Box w="100%">
            <Text fontSize="2xl">
                Frequency: {" "} {freq + " ms"}
            </Text>
            <Slider
                w="100%"
                defaultValue={10}
                min={0.001}
                max={100}
                onChangeEnd={val => setFreq(val)}
            >
                <SliderTrack>
                    <SliderFilledTrack />
                </SliderTrack>
                <SliderThumb />
            </Slider>
        </Box>
    );
}
