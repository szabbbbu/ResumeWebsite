"use client"
import { useEffect, useRef } from "react";
import CanvasLayer from "./CanvasLayer";
import { useAppContext } from "@/contexts/useAppContext";
import { clamp } from "../util/Clamp";
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

function blerp(
    x: number,
    y: number,
    topLeft: number,
    topRight: number,
    bottomLeft: number,
    bottomRight: number
  ): number {
    // Calculate interpolation weights
    const xWeight: number = 1 - x;
    const yWeight: number = 1 - y;
  
    // Perform bilinear interpolation
    const interpolatedValue: number =
      topLeft * xWeight * yWeight +
      topRight * x * yWeight +
      bottomLeft * xWeight * (1 - y) +
      bottomRight * x * (1 - y);
  
    return interpolatedValue;
  }
  

function lerp(
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

    // console.log("LERP VALUE::: ", newValue);
  
    return clamp(newValue, 0, 1);
    // return newValue
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
        const dh = isoGrid.getHeightInterval();
        const dw = isoGrid.getWidthInterval();

        /** Points  */
        const topLeft = currGrid[rowNum - 1][colNum - 1];
        const topRight = currGrid[rowNum - 1][colNum];
        const btmLeft = currGrid[rowNum][colNum - 1];
        /** Grid cell boundaries */
        const leftBound = btmLeft.getXPos();
        const rightBound = btmRight.getXPos();
        const upBound = topLeft.getYPos();
        const downBound = btmLeft.getYPos();

        /** Square sides */
        const sideA: Pair = new Pair(
            leftBound+dw*lerp(1, topLeft.getValue(), topRight.getValue()),
            upBound
            ); //top side
        const sideB: Pair = new Pair(
            rightBound,
            upBound+dh*lerp(1, topRight.getValue(), btmRight.getValue())
        );
        const sideC = new Pair( // btm side
            leftBound+dw*lerp(1,btmLeft.getValue(),btmRight.getValue()),
            downBound
        );
        const sideD: Pair = new Pair( //left side
            leftBound,
            upBound+dh*lerp(1, topLeft.getValue(), btmLeft.getValue()) 
        );
        
        
        // console.log("side d", sideD)
        const config = [topLeft.getOccupied(), topRight.getOccupied(), btmRight.getOccupied(), btmLeft.getOccupied()];
        const s: string = config.toString();
        // console.log(contourStates[s])
        const currState: number = ContourStates[s];
        const strokeWidth = 2;
        switch(currState) {
            case 0:
                // console.log("No contour");
                break;
            case 1: //* bottom left corner */
            case 14:
                // console.log(lerp(Math.abs(btmLeft.getValue()), 0,60,btmLeft.getXPos(), btmRight.getXPos()))
                new Line(sideD.X, sideD.Y, sideC, strokeWidth, ctx)
                .drawShape()
                break;
            case 2: /** bottom right */
            case 13:
                new Line(sideC.X, sideC.Y, sideB, strokeWidth, ctx)
                .drawShape();
                break;
            case 3: /** bottom left, bottom right */
            case 12:
                new Line(sideD.X, sideD.Y, sideB, strokeWidth, ctx)
                .drawShape()
                break;
            case 4: /** top right */
            case 11:
                new Line(sideA.X, sideA.Y, sideB, strokeWidth, ctx)
                .drawShape();
                break;
            case 5: /** top right, bottom left */
                new Line(sideD.X, sideD.Y, sideA, strokeWidth, ctx)
                .drawShape()
                new Line(sideC.X, sideC.Y, sideB, strokeWidth, ctx)
                .drawShape()
                break;
            case 6: /** top right, bottom right */
            case 9:
                new Line(sideA.X, sideA.Y, sideC, strokeWidth, ctx)
                .drawShape()
                if (sideA.Y > btmLeft.getYPos() || sideA.Y < topLeft.getYPos()) console.log("DANGER!")
                break;
            case 7: /** top right, bottom right, bottom left */
            case 8:
                new Line(sideD.X, sideD.Y, sideA, strokeWidth, ctx)
                .drawShape()
                break;
            case 10:
                new Line(sideA.X, sideA.Y, sideB,strokeWidth,ctx).drawShape();
                new Line(sideD.X, sideD.Y, sideC, strokeWidth , ctx).drawShape();
                break;
            case 15:
                break;
            default:
                console.error("string generated that isn't defined in ContourStates enum")
            //     break;
        }
    }

    useEffect(() => {
        if (layerRef.current?.getCanvasContext()) {
            const ctx = layerRef.current.getCanvasContext();
            if (ctx) {
                ctx.imageSmoothingEnabled = true;
                ctx.imageSmoothingQuality = "high";
            }
        }
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
                        
                        // determineContour(point, rowNum, colNum, currGrid, ctx);
                        ctx.beginPath();
                        ctx.arc(point.getXPos(), point.getYPos(),1,0,360);
                        ctx.fill()
                        // ctx.fillText(`${point.getOccupied()}`, point.getXPos() + 5, point.getYPos() + 10);
                        point.setOccupied(isOccupied);
                        if (colNum > 0 && rowNum > 0) {
                            determineContour(point, rowNum, colNum, currGrid, ctx);
                        }
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

