"use client";

import {useEffect, useRef} from "react"
import CanvasLayer from "./CanvasLayer"
import { useAppContext } from "@/contexts/useAppContext";
import Line from "../ShapeSystem/Line";
import Pair from "../util/Pair";
import Grid from "../isosurface/Grid";
import Circle from "../ShapeSystem/Circle";

interface I_CanvasLayer {
    getCanvasContext: () => CanvasRenderingContext2D | null;
}

//renders the debug layer (grid)
export default function CanvasLayerClientDebug() {
    const {isoGrid} = useAppContext()
    const layerRef = useRef<I_CanvasLayer>(null);

    useEffect(() => {
        if (layerRef.current) {
            // console.log("yes")Á
            const ctx: CanvasRenderingContext2D | null= layerRef.current.getCanvasContext();
            if (!ctx) return;
            /** ASSEMBLE GRID HERE */
            const g = isoGrid.getGrid();
            g.forEach(row => {
                row.forEach(point => {
                    const newGridPoint = new Circle(point.getXPos(), point.getYPos(), 5, ctx);
                    newGridPoint.drawShape("white");
                    ctx.fillText(`${point.getValue()}`, point.getXPos() + 10, point.getYPos() + 10)
                });
            });   
        }
    });

    return (
        <CanvasLayer ref={layerRef}/>
    );
}
