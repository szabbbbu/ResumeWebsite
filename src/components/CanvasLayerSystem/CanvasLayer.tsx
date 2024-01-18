"use client"
import { useAppContext } from "@/contexts/useAppContext";
import React, { useEffect, useState } from "react";
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
        const {appWidth, appHeight, setAppWidth, setAppHeight, isoGrid, setIsoGrid} = useAppContext();
        // const [w, setW] = useState(typeof window == undefined ? 0 : window.innerWidth)
        // const [h, setH] = useState(typeof window == undefined ? 0 : window.innerWidth)
        useEffect(() => {
            
            const handleResize = () => {
                // setW(window.innerWidth);
                // setH(window.innerHeight);

                
                if (innerRef.current) {
                    setAppWidth(window.innerWidth);
                    setAppHeight(window.innerHeight);

                    isoGrid.updateGridSize(appWidth, appHeight);
                    setIsoGrid(isoGrid);
                    innerRef.current.width = appWidth;
                    innerRef.current.height = appHeight;
                    // innerRef.current.getContext('2d')?.scale(appHeight, appWidth);

                }
                
            }
            
                handleResize(); // Initialize with the current window size
                window.addEventListener('resize', handleResize);
          

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