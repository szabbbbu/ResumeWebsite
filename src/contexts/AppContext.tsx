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
    setMenuHidden: React.Dispatch<React.SetStateAction<boolean>>
    isoGrid: Grid;
    setIsoGrid: React.Dispatch<React.SetStateAction<Grid>>;
    circles: Circle[];
    setCircles: React.Dispatch<React.SetStateAction<Circle[]>>;
}

export const AppContext = createContext<I_AppContext | undefined>(undefined);

