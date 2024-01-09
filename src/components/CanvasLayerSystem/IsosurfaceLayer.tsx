"use client"
import { useEffect, useRef } from "react";
import CanvasLayer from "./CanvasLayer";
import { useAppContext } from "@/contexts/useAppContext";
import GridPoint from "../isosurface/GridPoint";
import Circle from "../ShapeSystem/Circle";
import Pair from "../util/Pair";

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
                ctx.clearRect(0,0,appWidth, appHeight);
                const currGrid = isoGrid.getGrid();

                currGrid.forEach((row, rowNum) => {
                    row.forEach((point, colNum) => {
                        const distValuesPerCircle: number[] = []
                        circles.forEach((circle, i) => {
                            const circlePos: Pair = circle.getPos();
                            const circleRadius: number = circle.radius;
                            const newDistance = Math.sqrt(Math.pow(point.getXPos() - circlePos.X, 2) + Math.pow(point.getYPos() - circlePos.Y, 2)) - circleRadius;
                            distValuesPerCircle.push(newDistance);
                            // ctx.fill();
                            point.setValue(newDistance);
                        })
                        let isOccupied = false;
                        distValuesPerCircle.forEach(val => {
                            if (val < 0) {
                                isOccupied = true;
                            }

                        })
                        
                        point.setOccupied(isOccupied);

                        ctx.fillStyle = "#cab456"
                        ctx.beginPath();
                        ctx.arc(point.getXPos(), point.getYPos(),3,0,360);
                        ctx.fill()
                        ctx.fillText(`${point.getOccupied()}`, point.getXPos(), point.getYPos());

                    })
                })
                isoGrid.setGrid(currGrid);
                setIsoGrid(isoGrid);

                // isoGrid.getGrid().forEach(row => {
                //     row.forEach(point => {
                        
                //     })
                // })
                // circles.forEach()
                // console.log(circles)
                // if (Array.isArray(circles))
                //     for (const circle of circles) {
                //         const coveredPoints = circle.getEnvelopedPoints();
                //         coveredPoints.forEach(point => allEnvelopedPoints.add(point));
                //     }
                // ctx.clearRect(0,0, appWidth, appHeight);



                // Circle.
                // Circle.grid.getGrid().forEach(row => {
                //     row.forEach(point => {
                //         if (allEnvelopedPoints.has(point)) {
                            
                //             ctx.beginPath()
                //             ctx.fillStyle = "blue";
                //             ctx.arc(point.getXPos(), point.getYPos(), 3, 0, 360)
                //             ctx.fillText(`${point.getValue().toFixed(2)}`, point.getXPos() + 10, point.getYPos() + 10)
                //             ctx.fill()
                //         }
                //         else {
                //             ctx.beginPath();
                //             ctx.fillStyle = "white";
                //             ctx.arc(point.getXPos(), point.getYPos(), 3, 0, 360)
                //             ctx.fillText(`${point.getValue().toFixed(2)}`, point.getXPos() + 10, point.getYPos() + 10)
                //             ctx.fill();
                //         }
                        
                //     })
                // })
                
                
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

