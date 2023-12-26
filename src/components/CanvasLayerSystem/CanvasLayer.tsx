"use client"
import React, { useEffect } from "react";
import { forwardRef, useRef, useImperativeHandle} from "react";

/**
 * TODO: make the canvas layer the size of the browser window
 * TODO: create functions in UseImperativeHandle to:
 *          add circles
 * 
 */
export default forwardRef(
    (props, ref) => {
        const innerRef = useRef<HTMLCanvasElement>(null);

        useEffect(() => {
            const handleResize = () => {
                if (innerRef.current) {
                    innerRef.current.width = window.innerWidth;
                    innerRef.current.height = window.innerHeight;
                }
            }

            window.addEventListener("resize", handleResize);
            handleResize();
            if (!innerRef.current) {
                return
            }

            return () => {
                window.removeEventListener("resize", handleResize);
            }
        }, [])

        useImperativeHandle(ref, () => {
            return {
                getCanvasContext: () => {
                    if (innerRef.current) {
                        return innerRef.current.getContext('2d');
                    }
                }
            }
        })

        return (
            <canvas data-testid="myCanvas" id="myCanvas" ref={innerRef}
            style={{ position: 'absolute', top: 0, left: 0, zIndex: -1, overflow:"hidden"}}></canvas>
        );
    }
);