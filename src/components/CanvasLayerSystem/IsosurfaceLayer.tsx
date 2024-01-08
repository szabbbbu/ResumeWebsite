"use client"
import { useEffect, useRef } from "react";
import CanvasLayer from "./CanvasLayer";
import { useAppContext } from "@/contexts/useAppContext";
import GridPoint from "../isosurface/GridPoint";
import Circle from "../ShapeSystem/Circle";

interface I_CanvasLayer {
    getCanvasContext: () => CanvasRenderingContext2D | undefined;
}

export default function IsosurfaceLayer() {

    const layerRef = useRef<I_CanvasLayer>(null);
    const {circles, isoGrid, setIsoGrid, appWidth, appHeight} = useAppContext();
    const allEnvelopedPoints = new Set<GridPoint>();

    const updateIsoGrid = () => {
        const newGrid = isoGrid;
        // newGrid.getGrid()
    }

    useEffect(() => {
        const update = () => {

            if (layerRef.current) {
                allEnvelopedPoints.clear();
                const ctx = layerRef.current.getCanvasContext()
                if (!ctx) return;
                // circles.forEach()
                // console.log(circles)
                if (Array.isArray(circles))
                    for (const circle of circles) {
                        const coveredPoints = circle.getEnvelopedPoints();
                        coveredPoints.forEach(point => allEnvelopedPoints.add(point));
                    }
                ctx.clearRect(0,0, appWidth, appHeight);
                // allEnvelopedPoints.forEach(point => {
                //     ctx.beginPath()
                //     ctx.fillStyle = "blue";
                //     ctx.arc(point.getXPos(), point.getYPos(), 3, 0, 360)
                //     ctx.fillText(`${point.getValue().toFixed(2)}`, point.getXPos() + 10, point.getYPos() + 10)
                //     ctx.fill()
                // })
                Circle.grid.getGrid().forEach(row => {
                    row.forEach(point => {
                        if (allEnvelopedPoints.has(point)) {
                            ctx.beginPath()
                            ctx.fillStyle = "blue";
                            ctx.arc(point.getXPos(), point.getYPos(), 3, 0, 360)
                            ctx.fillText(`${point.getValue().toFixed(2)}`, point.getXPos() + 10, point.getYPos() + 10)
                            ctx.fill()
                        }
                        else {
                            ctx.beginPath();
                            ctx.fillStyle = "white";
                            ctx.arc(point.getXPos(), point.getYPos(), 3, 0, 360)
                            ctx.fill();
                        }
                        
                    })
                })
                
                
             }
             requestAnimationFrame(update);
            //  updateIsoGrid();
        }
        update();
     
    }, [])

    return (
        <CanvasLayer ref={layerRef}/>
    )
}

