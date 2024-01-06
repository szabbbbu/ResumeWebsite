"use client"
import { ReactNode, useEffect, useState } from "react";
import { AppContext } from "./AppContext";
import Grid from "../components/isosurface/Grid";

type Props = {
    children: ReactNode;
}

export default function AppContextProvider({children}: Props) {
    
    const [appWidth, setAppWidth] = useState<number>(window.innerWidth);
    const [appHeight, setAppHeight] = useState<number>(window.innerHeight);


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
                    isoGrid: new Grid(12, appWidth, appHeight)
                }
            }
        >
            {children}
        </AppContext.Provider>
    );
}
