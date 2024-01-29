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
    const [menuHidden, setMenuHidden] = useState<boolean>(false);
    //TODO: REMOVE APP WIDTH & HEIGHT?
    return(
        <AppContext.Provider
            value={
                {
                    appHeight: appHeight,
                    appWidth: appWidth,
                    setAppHeight:setAppHeight,
                    setAppWidth: setAppWidth,
                    menuHidden: menuHidden,
                    setMenuHidden: setMenuHidden
                }
            }
        >
            {children}
        </AppContext.Provider>
    );
}

const AppContextProvider = memo(AppCtx);
export default AppContextProvider;
