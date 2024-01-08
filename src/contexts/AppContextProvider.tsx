"use client"
import { ReactNode, useEffect, useState } from "react";
import { AppContext } from "./AppContext";
import Grid from "../components/isosurface/Grid";
import Circle from "@/components/ShapeSystem/Circle";

type Props = {
    children: ReactNode;
}

export default function AppContextProvider({children}: Props) {
    
    const [appWidth, setAppWidth] = useState<number>(window.innerWidth);
    const [appHeight, setAppHeight] = useState<number>(window.innerHeight);
    const [isoGrid, setIsoGrid] = useState<Grid>(new Grid(12, appWidth, appHeight));
    const [circles, setCircles] = useState<Circle[]>([])


    useEffect(() => {
        const handleResize = () => {
          setAppWidth(window.innerWidth);
          setAppHeight(window.innerHeight);
        }
        window.addEventListener("resize", handleResize);
    
        return(() => {
          window.removeEventListener("resize", handleResize);
        });
      });

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
