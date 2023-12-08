import React from "react";
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
            <canvas data-testid="myCanvas" id="myCanvas" ref={innerRef}></canvas>
        );
    }
);