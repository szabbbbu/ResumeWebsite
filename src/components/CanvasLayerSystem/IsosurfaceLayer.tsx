"use client"
import { useEffect, useRef } from "react";
import CanvasLayer from "./CanvasLayer";
import { useAppContext } from "@/contexts/useAppContext";
import GridPoint from "../isosurface/GridPoint";
import Circle from "../ShapeSystem/Circle";
import Pair from "../util/Pair";
import Line from "../ShapeSystem/Line";

interface I_CanvasLayer {
    getCanvasContext: () => CanvasRenderingContext2D | undefined;
}

enum ContourStates {
    "false,false,false,false" = 0, // 0000
    "false,false,false,true" = 1, // 0001
    "false,false,true,false" = 2, // 0010
    "false,false,true,true" = 3, // 0011
    "false,true,false,false" = 4, // 0100
    "false,true,false,true" = 5, // 0101
    "false,true,true,false" = 6, // 0110
    "false,true,true,true" = 7, // 0111
    "true,false,false,false" = 8, // 1000
    "true,false,false,true" = 9, // 1001
    "true,false,true,false" = 10, // 1010
    "true,false,true,true" = 11, // 1011
    "true,true,false,false" = 12, // 1100
    "true,true,false,true" = 13, // 1101
    "true,true,true,false" = 14, // 1110
    "true,true,true,true" = 15 // 1111
}

export default function IsosurfaceLayer() {

    const layerRef = useRef<I_CanvasLayer>(null);
    const {circles, isoGrid, setIsoGrid, appWidth, appHeight} = useAppContext();
    const allEnvelopedPoints = new Set<GridPoint>();

    function determineContour(
        btmRight: GridPoint,
        rowNum: number,
        colNum: number,
        currGrid: GridPoint[][],
        ctx: CanvasRenderingContext2D
        ) {

        const topLeft = currGrid[rowNum - 1][colNum - 1];
        const topRight = currGrid[rowNum - 1][colNum];
        const btmLeft = currGrid[rowNum][colNum - 1];
        const config = [topLeft.getOccupied(), topRight.getOccupied(), btmRight.getOccupied(), btmLeft.getOccupied()];
        const s: string = config.toString();
        // console.log(contourStates[s])
        const currState: number = ContourStates[s];
        
        const contourIntervalW = isoGrid.getWidthInterval()/2;
        const contourIntervalH = isoGrid.getHeightInterval()/2;

        switch(currState) {
            case 0:
                // console.log("No contour");
                break;
            case 1: //* bottom left corner */
                new Line(btmLeft.getXPos(), btmLeft.getYPos() - contourIntervalH, new Pair(btmLeft.getXPos() + contourIntervalW, btmLeft.getYPos()), 2, ctx)
                .drawShape()
                break;
            case 2: /** bottom right */
                new Line(btmRight.getXPos() - contourIntervalW, btmRight.getYPos(), new Pair(btmRight.getXPos(), btmRight.getYPos() - contourIntervalH), 2, ctx)
                .drawShape();
                break;
            case 3: /** bottom left, bottom right */
                new Line(btmLeft.getXPos(), btmLeft.getYPos() - contourIntervalH, new Pair(btmRight.getXPos(), btmRight.getYPos() - contourIntervalH), 2, ctx)
                .drawShape()
                break;
            case 4: /** top right */
                new Line(topRight.getXPos() - contourIntervalW, topRight.getYPos(), new Pair(topRight.getXPos(), topRight.getYPos() + contourIntervalH), 2, ctx)
                .drawShape();
                break;
            case 5: /** top right, bottom left */
                new Line(topRight.getXPos() - contourIntervalW, topRight.getYPos(), new Pair(topRight.getXPos(), topRight.getYPos() + contourIntervalH), 2, ctx)
                .drawShape();
                new Line(btmLeft.getXPos(), btmLeft.getYPos() - contourIntervalH, new Pair(btmLeft.getXPos() + contourIntervalW, btmLeft.getYPos()), 2, ctx)
                .drawShape()
                break;
            case 6: /** top right, bottom right */
                new Line(topRight.getXPos() - contourIntervalW, topRight.getYPos(), new Pair(btmRight.getXPos() - contourIntervalW, btmRight.getYPos()), 2, ctx)
                .drawShape()
                break;
            case 7: /** top right, bottom right, bottom left */
                new Line(topLeft.getXPos() + contourIntervalW, topLeft.getYPos(), new Pair(topLeft.getXPos(), topLeft.getYPos() + contourIntervalH), 2, ctx)
                .drawShape()
                break;
            case 8: /** top left */
                new Line(topLeft.getXPos() + contourIntervalW, topLeft.getYPos(), new Pair(topLeft.getXPos(), topLeft.getYPos() + contourIntervalH), 2, ctx)
                .drawShape()
                break;
            case 9: /** top left, bottom left */
                new Line(topRight.getXPos() - contourIntervalW, topRight.getYPos(), new Pair(btmRight.getXPos() - contourIntervalW, btmRight.getYPos()), 2, ctx)
                .drawShape()
                break;
            case 10:
                new Line(topRight.getXPos() - contourIntervalW, topRight.getYPos(), new Pair(topRight.getXPos(), topRight.getYPos() + contourIntervalH), 2, ctx)
                .drawShape();
                new Line(btmLeft.getXPos(), btmLeft.getYPos() + contourIntervalH, new Pair(btmLeft.getXPos() + contourIntervalW, btmLeft.getYPos()), 2, ctx)
                break;
            case 11:
                new Line(topRight.getXPos() - contourIntervalW, topRight.getYPos(), new Pair(topRight.getXPos(), topRight.getYPos() + contourIntervalH), 2, ctx)
                .drawShape();
                break;
            case 12:
                new Line(btmLeft.getXPos(), btmLeft.getYPos() - contourIntervalH, new Pair(btmRight.getXPos(), btmRight.getYPos() - contourIntervalH), 2, ctx)
                .drawShape()
                break;
            case 13:
                new Line(btmRight.getXPos() - contourIntervalW, btmRight.getYPos(), new Pair(btmRight.getXPos(), btmRight.getYPos() - contourIntervalH), 2, ctx)
                .drawShape();
                break;
            case 14:
                new Line(btmLeft.getXPos(), btmLeft.getYPos() - contourIntervalH, new Pair(btmLeft.getXPos() + contourIntervalW, btmLeft.getYPos()), 2, ctx)
                .drawShape()
                break;
            case 15:
                break;
            default:
                console.error("string generated that isn't defined in ContourStates enum")
                break;
        }
        

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
                                const circleRadius: number = circle.radius + 20;
                                const newDistance = Math.sqrt(Math.pow(point.getXPos() - circlePos.X, 2) + Math.pow(point.getYPos() - circlePos.Y, 2)) - circleRadius;
                                distValuesPerCircle.push(newDistance);
                                // ctx.fill();
                                point.setValue(newDistance);
                            })
                        let isOccupied = false;
                        ctx.fillStyle = "#cab456"
                        distValuesPerCircle.forEach(val => {
                            if (val < 0) {
                                ctx.fillStyle = "blue";
                                isOccupied = true;
                            }
                            point.setValue(Math.min(point.getValue(), val));
                        });
                        if (colNum > 0 && rowNum > 0) {
                            determineContour(point, rowNum, colNum, currGrid, ctx);
                        }
                        // determineContour(point, rowNum, colNum, currGrid, ctx);
                        // ctx.beginPath();
                        // ctx.arc(point.getXPos(), point.getYPos(),1,0,360);
                        // ctx.fill()
                        // ctx.fillText(`${point.getOccupied()}`, point.getXPos() + 5, point.getYPos() + 10);
                        point.setOccupied(isOccupied);

                    })
                })
                isoGrid.setGrid(currGrid);
                setIsoGrid(isoGrid);
             }
             requestAnimationFrame(update);
        }
        update();
     
    }, []);

    return (
        <CanvasLayer ref={layerRef}/>
    );
}

