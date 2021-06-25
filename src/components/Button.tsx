type ButtonProps = {
    text?: String;
    num?: Number;
}

export function Button(props: ButtonProps) {
    return (
        <button>{props.text || props.num}</button>
    )
}
