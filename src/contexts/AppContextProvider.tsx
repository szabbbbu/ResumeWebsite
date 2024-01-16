"use client"
import { ReactNode, useEffect, useState } from "react";
import { AppContext } from "./AppContext";
import Grid from "../components/isosurface/Grid";
import Circle from "@/components/ShapeSystem/Circle";


type Props = {
    children: ReactNode;
}

export default function AppContextProvider({children}: Props) {

    const [appWidth, setAppWidth] = useState<number>(typeof window == undefined? 0 : window.innerWidth );
    const [appHeight, setAppHeight] = useState<number>(typeof window == undefined? 0 : window.innerHeight);
    const [isoGrid, setIsoGrid] = useState<Grid>(new Grid(36, appWidth, appHeight));
    const [circles, setCircles] = useState<Circle[]>([])

    useEffect(() => {
        const handleResize = () => {
            console.log("HANDLE RESIZE in app ctx");
            setAppWidth(window.innerWidth);
            setAppHeight(window.innerHeight);
            setIsoGrid(new Grid(24, window.innerWidth, window.innerHeight));
        };
    
        // Initialize with the current window size
        handleResize();
    
        const resizeListener = () => {
            // Delay the handleResize function to ensure that the state is updated first
            setTimeout(() => {
                handleResize();
            }, 0);
        };
    
        window.addEventListener('resize', resizeListener);
    
        return () => {
            window.removeEventListener('resize', resizeListener);
        };
    }, []);  // OMG THIS WORKS

    // useEffect(() => {
    //     // setAppWidth(window.innerWidth)
    //     // setAppHeight(window.innerHeight)
    //     // setIsoGrid(new Grid(24, window.innerWidth, window.innerHeight))
    //     console.log(appHeight)
    //         const handleResize = () => {
    //             console.log("HANDLE RESIZE in app ctx")
    //             setAppWidth(window.innerWidth);
    //             setAppHeight(window.innerHeight);
    //             setIsoGrid(new Grid(24, appWidth, appHeight))
    //         }
    //         import('react-dom').then(() => {
    //             handleResize(); // Initialize with the current window size
            
    //             window.addEventListener('resize', handleResize);
    //         }
    //         );

    //         return(() => {
    //             window.removeEventListener("resize", handleResize);
    //         });
    //     }, [appWidth, appHeight]
    // );

    useEffect(() => {
        const handleResize = () => {
            console.log("HANDLE RESIZE in app ctx");
            setAppWidth(window.innerWidth);
            setAppHeight(window.innerHeight);
            setIsoGrid(new Grid(24, window.innerWidth, window.innerHeight));
        };
    
        // Initialize with the current window size
        handleResize();
    
        const resizeListener = () => {
            // Delay the handleResize function to ensure that the state is updated first
            setTimeout(() => {
                handleResize();
            }, 0);
        };
    
        window.addEventListener('resize', resizeListener);
    
        return () => {
            window.removeEventListener('resize', resizeListener);
        };
    }, []); 

    
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
