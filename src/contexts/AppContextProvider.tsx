"use client"
import { ReactNode, memo, useEffect, useState } from "react";
import { AppContext } from "./AppContext";
import Circle from "@/components/isosurface/ShapeSystem/Circle";


type Props = {
    children: ReactNode;
}

function AppCtx({children}: Props) {
    // console.log("app ctxt")
    const [appWidth, setAppWidth] = useState<number>(751);
    const [appHeight, setAppHeight] = useState<number>(751);
    const [menuHidden, setMenuHidden] = useState<boolean>(true);

    useEffect(() => {
        function handleResize() {
            setAppWidth(window.innerWidth);
            if (window.innerWidth < 768) {
                setMenuHidden(true);
            }
            else {
                setMenuHidden(false);
            }
        }
        handleResize();
        window.addEventListener("resize", handleResize);
        return () => {
            window.removeEventListener("resize", handleResize);
        }
    }, [appWidth])
    return(
        <AppContext.Provider
            value={
                {
                    appHeight: appHeight,
                    appWidth: appWidth,
                    setAppHeight:setAppHeight,
                    setAppWidth: setAppWidth,
                    menuHidden: menuHidden,
                    setMenuHidden: setMenuHidden,
                }
            }
        >
            {children}
        </AppContext.Provider>
    );
}

const AppContextProvider = memo(AppCtx);
export default AppContextProvider;
