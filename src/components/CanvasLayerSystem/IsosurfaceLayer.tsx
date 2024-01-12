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

function linearInterpolation(
    value: number,
    originalMin: number,
    originalMax: number,
    newMin=0,
    newMax=1
  ): number {
    // Clamping the value within the original range
    // const clampedValue = Math.min(Math.max(value, originalMin), originalMax);
    // const normalizedValue = (clampedValue - originalMin) / (originalMax - originalMin);

  
    // Perform the linear interpolation
    const newValue = newMin + ((value - originalMin) * (newMax - newMin)) / (originalMax - originalMin);
  
    return newValue;
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
        let interX: number;
        let interY: number;
        const clampingMax = isoGrid.getHeightInterval();
        const intervalWidth = isoGrid.getWidthInterval();
        switch(currState) {
            case 0:
                // console.log("No contour");
                break;
            // case 1: //* bottom left corner */
            //     // console.log(linearInterpolation(Math.abs(btmLeft.getValue()), 0,60,btmLeft.getXPos(), btmRight.getXPos()))
            //     interX = linearInterpolation(1, btmLeft.getValue(), btmRight.getValue())
            //     // console.log("interx", )
            //     interY = linearInterpolation(1, topLeft.getValue(), btmLeft.getValue());
            //     new Line(btmLeft.getXPos(), topLeft.getYPos()+(isoGrid.getHeightInterval()*interY), new Pair(btmLeft.getXPos()+(intervalWidth*interX), btmLeft.getYPos()), 2, ctx)
            //     .drawShape()
            //     break;
            // case 2: /** bottom right */
            //     interX = linearInterpolation(btmRight.getValue(),0 - clampingMax,0, btmLeft.getXPos(), btmRight.getXPos())
            //     interY = linearInterpolation(Math.abs(btmRight.getValue()), 0, clampingMax, btmRight.getYPos(), topRight.getYPos())
            //     // console.log("INTER X", interX)
            //     new Line(interX, btmRight.getYPos(), new Pair(btmRight.getXPos(), interY), 2, ctx)
            //     .drawShape();
            //     break;
            // case 3: /** bottom left, bottom right */
            //     const interYBtmRight = linearInterpolation(Math.abs(btmRight.getValue()), 0, clampingMax, btmRight.getYPos(), topRight.getYPos());
            //     const interYBtmLeft = linearInterpolation(Math.abs(btmLeft.getValue()), 0, clampingMax, btmLeft.getYPos(), topLeft.getYPos())
                
            //     new Line(btmLeft.getXPos(), interYBtmLeft, new Pair(btmRight.getXPos(), interYBtmRight), 2, ctx)
            //     .drawShape()
            //     break;
            // case 4: /** top right */
            //     interX = linearInterpolation(topRight.getValue(), 0-clampingMax,0,topLeft.getXPos(), topRight.getXPos())
            //     interY = linearInterpolation(Math.abs(topRight.getValue()), 0,clampingMax, topLeft.getYPos(), btmLeft.getYPos())
            //     new Line(interX, topRight.getYPos(), new Pair(topRight.getXPos(), interY), 2, ctx)
            //     .drawShape();
            //     break;
            // case 5: /** top right, bottom left */
            //     interX = linearInterpolation(topRight.getValue(), 0-clampingMax,0,topLeft.getXPos(), topRight.getXPos()) // top right
            //     interY = linearInterpolation(Math.abs(topRight.getValue()), 0,clampingMax, topLeft.getYPos(), btmLeft.getYPos()) // topRight
            //     const interXBtmLeft1 = linearInterpolation(Math.abs(btmLeft.getValue()), 0,clampingMax,btmLeft.getXPos(), btmRight.getXPos())
            //     const interYBtmLeft1 = linearInterpolation(btmLeft.getValue(), 0-clampingMax, 0, topLeft.getYPos(), btmLeft.getYPos())
            //     new Line(interX, topRight.getYPos(), new Pair(topRight.getXPos(), interY), 2, ctx)
            //     .drawShape()
            //     new Line(btmLeft.getXPos(), interYBtmLeft1, new Pair(interXBtmLeft1, btmLeft.getYPos()), 2, ctx)
            //     .drawShape()
            //     break;
            // case 6: /** top right, bottom right */
            //     const interXTopRight = linearInterpolation(topRight.getValue(), 0-clampingMax, 0, topLeft.getXPos(), topRight.getXPos());
            //     const interXBtmRight = linearInterpolation(btmRight.getValue(), 0-clampingMax, 0, btmLeft.getXPos(), btmRight.getXPos());
            //     new Line(interXTopRight, topRight.getYPos(), new Pair(interXBtmRight, btmRight.getYPos()), 2, ctx)
            //     .drawShape()
            //     break;
            // case 7: /** top right, bottom right, bottom left */
            //     interX = linearInterpolation(topRight.getValue(), 0-clampingMax,0, topLeft.getXPos(), topRight.getXPos()) // top right
            //     interY = linearInterpolation(btmLeft.getValue(), 0-clampingMax, 0, topLeft.getYPos(), btmLeft.getYPos())
            //     new Line(interX, topLeft.getYPos(), new Pair(topLeft.getXPos(), interY), 2, ctx)
            //     .drawShape()
            //     break;
            // case 8: /** top left */
            //     interX = linearInterpolation(Math.abs(topLeft.getValue()), 0, clampingMax, topLeft.getXPos(), topRight.getXPos())
            //     interY = linearInterpolation(Math.abs(topLeft.getValue()), 0, clampingMax, topLeft.getYPos(), btmLeft.getYPos());
            //     new Line(interX, topLeft.getYPos(), new Pair(topLeft.getXPos(), interY), 2, ctx)
            //     .drawShape()
            //     break;
            // case 9: /** top left, bottom left */
            //     interX = linearInterpolation(Math.abs(topLeft.getValue()), 0, clampingMax, topLeft.getXPos(), topRight.getXPos())
            //     interY = linearInterpolation(Math.abs(btmLeft.getValue()), 0, clampingMax, btmLeft.getXPos(), btmRight.getXPos())
            //     new Line(interX, topRight.getYPos(), new Pair(interY, btmRight.getYPos()), 2, ctx)
            //     .drawShape()
            //     break;
            //     case 10: /** top left, bottom right */
            //     const interXLine1 = linearInterpolation(topLeft.getValue(), 0 - clampingMax, 0, topLeft.getXPos(), topRight.getXPos());
            //     const interYLine1 = linearInterpolation(Math.abs(btmRight.getValue()), 0, clampingMax, btmRight.getYPos(), topRight.getYPos());
            
            //     const interYLine2 = linearInterpolation(btmRight.getValue(), 0 - clampingMax, 0, btmLeft.getYPos(), btmRight.getYPos());
            //     const interXLine2 = linearInterpolation(Math.abs(topLeft.getValue()), 0, clampingMax, topLeft.getXPos(), btmLeft.getXPos());
            
            //     new Line(interXLine1, topRight.getYPos(), new Pair(topRight.getXPos(), interYLine1), 2, ctx).drawShape();
            //     new Line(btmLeft.getXPos(), interYLine2, new Pair(interXLine2, btmLeft.getYPos()), 2, ctx).drawShape();
            //     break;
            case 11: /** top left, bottom left, bottom right */
                interX = linearInterpolation(1, topLeft.getValue(), topRight.getValue());
                interY = linearInterpolation(1, topRight.getValue(), btmRight.getValue())
                new Line(btmLeft.getXPos() + (intervalWidth*interX), topRight.getYPos(), new Pair(topRight.getXPos(), topLeft.getYPos()+(isoGrid.getHeightInterval()*interY)), 2, ctx)
                .drawShape();
                break;
            // case 12: /** top left, top right */
            //     interX = linearInterpolation(Math.abs(topLeft.getValue()), 0, clampingMax, topLeft.getYPos(), btmLeft.getYPos())
            //     interY = linearInterpolation(Math.abs(topRight.getValue()), 0, clampingMax, topLeft.getYPos(), btmLeft.getYPos())
            //     new Line(btmLeft.getXPos(), interX, new Pair(btmRight.getXPos(), interY), 2, ctx)
            //     .drawShape()
            //     break;
            // case 13: /** top left, top right, bottom left */
            //     interX = linearInterpolation(Math.abs(btmLeft.getValue()), 0,clampingMax, btmLeft.getXPos(), btmRight.getXPos());
            //     interY = linearInterpolation(Math.abs(topRight.getValue()), 0,clampingMax, topRight.getYPos(), btmRight.getYPos());
            //     new Line(interX, btmRight.getYPos(), new Pair(btmRight.getXPos(), interY), 2, ctx)
            //     .drawShape();
            //     break;
            // case 14: /** top left, top right, bottom right */
            //     interX = linearInterpolation(btmRight.getValue(), 0-clampingMax, 0, btmLeft.getXPos(), btmRight.getXPos());
            //     interY = linearInterpolation(Math.abs(topLeft.getValue()), 0,clampingMax, topLeft.getYPos(), btmLeft.getYPos());
            //     new Line(btmLeft.getXPos(), interY, new Pair(interX, btmLeft.getYPos()), 2, ctx)
            //     .drawShape()
            //     break;
            // case 15:
            //     break;
            // default:
            //     console.error("string generated that isn't defined in ContourStates enum")
            //     break;
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
                                const circleRadius: number = circle.radius + 40;
                                const newDistance = Math.sqrt(Math.pow(point.getXPos() - circlePos.X, 2) + Math.pow(point.getYPos() - circlePos.Y, 2)) - circleRadius;
                                distValuesPerCircle.push(newDistance);
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
                        ctx.beginPath();
                        ctx.arc(point.getXPos(), point.getYPos(),1,0,360);
                        ctx.fill()
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

