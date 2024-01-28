"use client"
import { ReactNode, memo, useEffect, useState } from "react";
import { AppContext } from "./AppContext";
import Circle from "@/components/ShapeSystem/Circle";


type Props = {
    children: ReactNode;
}

function AppCtx({children}: Props) {
    console.log("app ctxt")
    const [appWidth, setAppWidth] = useState<number>(1470);
    const [appHeight, setAppHeight] = useState<number>(751);
    // const [isoGrid, setIsoGrid] = useState<Grid>(new Grid(12, appWidth, appHeight));
    const [menuHidden, setMenuHidden] = useState<boolean>(false)
    const [circles, setCircles] = useState<Circle[]>([])

    
    return(
        <AppContext.Provider
            value={
                {
                    appHeight: appHeight,
                    appWidth: appWidth,
                    setAppHeight:setAppHeight,
                    setAppWidth: setAppWidth,
                    // isoGrid: isoGrid,
                    // setIsoGrid: setIsoGrid,
                    menuHidden: menuHidden,
                    setMenuHidden: setMenuHidden,
                    circles: circles, 
                    setCircles: setCircles
                }
            }
        >
            {children}
        </AppContext.Provider>
    );
}

const AppContextProvider = memo(AppCtx);
export default AppContextProvider;
