interface VisControllerProps {
    array: number[];
    leftIdx: number;
    rightIdx: number;
}

export default function VisController(props: VisControllerProps) {
    const { array, leftIdx, rightIdx } = props;
    return (
        <div>Hello</div>
    )
}