"use client"
import { ReactNode, useEffect, useState } from "react";
import { AppContext } from "./AppContext";
import Grid from "../components/isosurface/Grid";
import Circle from "@/components/ShapeSystem/Circle";
import { metadata } from "@/app/layout";


type Props = {
    children: ReactNode;
}

export default function AppContextProvider({children}: Props) {

    const [appWidth, setAppWidth] = useState<number>(1470);
    const [appHeight, setAppHeight] = useState<number>(751);
    const [isoGrid, setIsoGrid] = useState<Grid>(new Grid(44, appWidth, appHeight));
    const [circles, setCircles] = useState<Circle[]>([])

    // useEffect(() => {
    //     const handleResize = () => {
    //         // console.log("HANDLE RESIZE in app ctx");
    //         setAppWidth(window.innerWidth);
    //         setAppHeight(window.innerHeight);
    //         console.log("app width: ", appWidth)
    //         isoGrid.updateGridSize(appWidth, appHeight);
    //         setIsoGrid(isoGrid);
    //         // console.log(isoGrid)
    //     };
    
    //     // Initialize with the current window size
    //     handleResize();
    
    //     const resizeListener = () => {
    //         // Delay the handleResize function to ensure that the state is updated first
    //         setTimeout(() => {
    //             handleResize();
    //         }, 1000);
    //     };
    
    //     window.addEventListener('resize', resizeListener);
    
    //     return () => {
    //         window.removeEventListener('resize', resizeListener);
    //     };
    // }, [appWidth, appHeight, isoGrid, setIsoGrid]);  // OMG THIS WORKS

    
    return(
        <AppContext.Provider
            value={
                {
                    appHeight: appHeight,
                    appWidth: appWidth,
                    setAppHeight:setAppHeight,
                    setAppWidth: setAppWidth,
                    isoGrid: isoGrid,
                    setIsoGrid: setIsoGrid,
                    circles: circles, 
                    setCircles: setCircles
                }
            }
        >
            {children}
        </AppContext.Provider>
    );
}
