import Grid from "@/components/isosurface/Grid";
import {createContext} from "react";
import React from "react"
interface I_AppContext {
    appWidth: number;
    appHeight: number;
    setAppWidth: React.Dispatch<React.SetStateAction<number>>;
    setAppHeight: React.Dispatch<React.SetStateAction<number>>;
    isoGrid: Grid;
}

export const AppContext = createContext<I_AppContext | undefined>(undefined);

