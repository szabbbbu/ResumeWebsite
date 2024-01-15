"use client"
import { useAppContext } from "@/contexts/useAppContext";
import React, { useEffect } from "react";
import { forwardRef, useRef, useImperativeHandle} from "react";
import Grid from "../isosurface/Grid";

/**
 * TODO: make the canvas layer the size of the browser window
 * TODO: create functions in UseImperativeHandle to:
 *          add circles
 * 
 */

export default forwardRef(
    (_, ref) => {
        const innerRef = useRef<HTMLCanvasElement>(null);
        const {appWidth, appHeight, setIsoGrid} = useAppContext();

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
        }, [appWidth, appHeight])

        useImperativeHandle(ref, () => {
            return {
                getCanvasContext: () => {
                    if (innerRef.current) {
                        return innerRef.current.getContext('2d');
                    }
                    else return null;
                }
            }
        })

        return (
            <canvas data-testid="myCanvas" id="myCanvas" ref={innerRef}
            style={{position: 'absolute', top: 0, left: 0, zIndex: -1, overflow:"hidden"}}></canvas>
        );
    }
);