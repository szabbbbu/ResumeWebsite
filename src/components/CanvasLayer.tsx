import { forwardRef, useRef, useImperativeHandle } from "react";

export default forwardRef(
    (props, ref) => {
        const innerRef = useRef<HTMLCanvasElement>(null);

        useImperativeHandle(ref, () => {
            return {
                focus: () => {
                    if (innerRef.current) innerRef.current.focus();
                }
            }
        })

        return (
            <canvas ref={innerRef}></canvas>
        );
    }
);