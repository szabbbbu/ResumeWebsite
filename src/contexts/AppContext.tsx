import Circle from "@/components/ShapeSystem/Circle";
import Grid from "@/components/isosurface/Grid";
import {createContext} from "react";
import React from "react"
interface I_AppContext {
    appWidth: number;
    appHeight: number;
    setAppWidth: React.Dispatch<React.SetStateAction<number>>;
    setAppHeight: React.Dispatch<React.SetStateAction<number>>;
    menuHidden: boolean;
    setMenuHidden: React.Dispatch<React.SetStateAction<boolean>>;
    // currCarouselIdx: number;
    // setCurrCarouselIdx: React.Dispatch<React.SetStateAction<number>>;
    // isoGrid: Grid;
    // setIsoGrid: React.Dispatch<React.SetStateAction<Grid>>;
}

export const AppContext = createContext<I_AppContext | undefined>(undefined);

