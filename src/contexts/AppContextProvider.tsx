"use client"
import { ReactNode, memo, useEffect, useState } from "react";
import { AppContext } from "./AppContext";


type Props = {
    children: ReactNode;
}

function AppCtx({children}: Props) {
    // console.log("app ctxt")
    const [appWidth, setAppWidth] = useState<number>(751);
    const [appHeight, setAppHeight] = useState<number>(751);
    const [menuHidden, setMenuHidden] = useState<boolean>(false);
    const [activateMenu, setActivateMenu] = useState<boolean>(false);
    useEffect(() => {
        function handleResize() {
            setAppWidth(window.innerWidth);
            if (window.innerWidth < 768) {
                setMenuHidden(true);
            }
            // else {
            //     // setMenuHidden(false);
            // }
            setActivateMenu(true);
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
                    activateMenu: activateMenu,
                    setActivateMenu: setActivateMenu
                }
            }
        >
            {children}
        </AppContext.Provider>
    );
}

const AppContextProvider = memo(AppCtx);
export default AppContextProvider;
