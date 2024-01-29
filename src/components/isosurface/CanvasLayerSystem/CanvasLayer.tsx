"use client"
import { useAppContext } from "@/contexts/useAppContext";
import React, { memo, useEffect } from "react";
import { forwardRef, useRef, useImperativeHandle} from "react";

/**
 * TODO: make the canvas layer the size of the browser window
 * TODO: create functions in UseImperativeHandle to:
 *          add circles
 * 
 */

const CL = forwardRef(
    (_, ref) => {
        const innerRef = useRef<HTMLCanvasElement>(null);
        
        useEffect(() => {
            if (innerRef.current) {
                innerRef.current.width = window.innerWidth;
                innerRef.current.height = window.innerHeight;
            }
        }, []);

        useImperativeHandle(ref, () => {
            return {
                getCanvasContext: () => {
                    if (innerRef.current) {
                        return innerRef.current.getContext('2d');
                    }
                    else return null;
                },
                resizeCanvas: (w: number, h: number) => {
                    if (innerRef.current) {
                        innerRef.current.width = w;
                        innerRef.current.height = h;
                    }
                }
            }
        })

        return (
            <canvas data-testid="myCanvas" id="myCanvas" ref={innerRef}
            style={{position: 'absolute', top: 0, left: 0, zIndex: -1, overflow:"hidden"}}></canvas>
        );
    }
);

const CanvasLayer = memo(CL);
export default CanvasLayer;
