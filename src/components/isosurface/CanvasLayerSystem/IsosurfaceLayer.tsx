"use client"
import { memo, useCallback, useEffect, useRef } from "react";
import CanvasLayer from "./CanvasLayer";
import { useAppContext } from "@/contexts/useAppContext";
import { lerp } from "../../util/LinearInterpolation";
import GridPoint from "../GridPoint";
import Pair from "../../util/Pair";
import Line from "../ShapeSystem/Line";
import { getDistance } from "../../util/Distance";
import {normalize} from "../../util/ClampFunctions";
import Grid from "../Grid";
import useIsoContext from "@/contexts/isosurface/useIsoContext";


interface I_CanvasLayer {
    getCanvasContext: () => CanvasRenderingContext2D | undefined;
    resizeCanvas: (w:number, h:number) => void;
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

function IsoLayer() {
    const layerRef = useRef<I_CanvasLayer>(null);
    const {circles} = useIsoContext();
    const animFrameId = useRef<number | null>(null)

    const isoGrid2 = useRef<Grid | null>(null);
    

    function determineContour(
        btmRight: GridPoint,
        rowNum: number,
        colNum: number,
        currGrid: GridPoint[][],
        ctx: CanvasRenderingContext2D
        ) {
        if (!isoGrid2.current) return
        const dh = isoGrid2.current.getHeightInterval();
        const dw = isoGrid2.current.getWidthInterval();
        /** Points  */
        const topLeft = currGrid[rowNum - 1][colNum - 1];
        const topRight = currGrid[rowNum - 1][colNum];
        const btmLeft = currGrid[rowNum][colNum - 1];
        /** Grid cell boundaries */
        const leftBound = btmLeft.getXPos();
        const rightBound = btmRight.getXPos();
        const upBound = topLeft.getYPos();
        const downBound = btmLeft.getYPos();
        
        const sideAScalingFactor = Math.abs(normalize(lerp(2, topLeft.getValue(), topRight.getValue()), 0,1));
        const sideBScalingFactor = Math.abs(normalize(lerp(2, topRight.getValue(), btmRight.getValue()), 0, 1));
        const sideCScalingFactor = Math.abs(normalize(lerp(2,btmLeft.getValue(),btmRight.getValue()), 0, 1));
        const sideDScalingFactor = Math.abs(normalize(lerp(2, topLeft.getValue(), btmLeft.getValue()), 0, 1));

        /** Square sides */
        const sideA: Pair = new Pair(
            leftBound+dw*sideAScalingFactor,
            upBound
            ); //top side
        const sideB: Pair = new Pair(
            rightBound,
            upBound+dh*sideBScalingFactor
        );
        const sideC = new Pair( // btm side
            leftBound+dw*sideCScalingFactor,
            downBound
        );
        const sideD: Pair = new Pair( //left side
            leftBound,
            upBound+dh*sideDScalingFactor
        );
        
        const config = [topLeft.getOccupied(), topRight.getOccupied(), btmRight.getOccupied(), btmLeft.getOccupied()];
        const s: string = config.toString();
        // console.log(contourStates[s])
        const currState: number = ContourStates[s as keyof typeof ContourStates];
        const strokeWidth = 2;
        
        switch(currState) {
            case 0:
                break;
            case 1: //* bottom left corner */
            case 14:
                // console.log("CASE 1/14???")
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
                break;
            case 7: /** top right, bottom right, bottom left */
            case 8:
                new Line(sideD.X, sideD.Y, sideA, strokeWidth, ctx)
                .drawShape()
                break;
            case 10:
                new Line(sideA.X, sideA.Y, sideB, strokeWidth, ctx).drawShape();
                new Line(sideD.X, sideD.Y, sideC, strokeWidth , ctx).drawShape();
                break;
            case 15:
                break;
            default:
                console.error("string generated that isn't defined in ContourStates enum")
                break;
        }
    }

    const update = useCallback(() => {
        if (layerRef.current) {
            const ctx = layerRef.current.getCanvasContext()
            if (!ctx) return;
            if (!isoGrid2.current) return;

            const currGrid = isoGrid2.current.getGrid();
            // console.log("curr grid dimensions: ", isoGrid.Width, isoGrid.Height)
            ctx.clearRect(0,0,isoGrid2.current.Width+5, isoGrid2.current.Height+5);

            currGrid.forEach((row, rowNum) => {
                row.forEach((point, colNum) => {
                        const distValuesPerCircle: number[] = []
                        if (Array.isArray(circles))
                        circles.forEach(circle => {
                            const circlePos: Pair = circle.getPos();
                            const circleRadius: number = circle.radius + 60;
                            const newDistance = getDistance(point.getXPos(), point.getYPos(), circlePos.X, circlePos.Y) - circleRadius;   
                            distValuesPerCircle.push(newDistance);
                            point.setValue(newDistance);
                        })
                    let isOccupied = false;
                    ctx.fillStyle = "#cab456"
                    distValuesPerCircle.forEach(val => {
                        if (val <= 2) {
                            ctx.fillStyle = "blue";
                            isOccupied = true;
                        }
                        point.setValue(Math.min(point.getValue(), val));
                    });

                    point.setOccupied(isOccupied);
                    if (colNum > 0 && rowNum > 0) {
                        determineContour(point, rowNum, colNum, currGrid, ctx);
                    }
                    // ctx.beginPath();
                    // ctx.arc(point.getXPos(), point.getYPos(), 1, 0, 360)
                    // ctx.fill();
                })
            })
            isoGrid2.current.setGrid(currGrid);
         }
        animFrameId.current = requestAnimationFrame(update);
    }, [isoGrid2])

    /** INITIALIZE GRID */
    useEffect(() => {
        const dim = 12;
        const w = window.innerWidth;
        const h = window.innerHeight;
        const gridInstance = new Grid(dim, w, h);
        isoGrid2.current = gridInstance;
        if (layerRef.current) {
            const ctx = layerRef.current.getCanvasContext();
            if (ctx) {
                ctx.imageSmoothingEnabled = true;
                ctx.imageSmoothingQuality = "high";
            }
        }   
        update();
        return () => {
            if (animFrameId.current) {
                cancelAnimationFrame(animFrameId.current)
            }
        }
    }, []);

    /** HANLDLE WINDOW RESIZE */
    useEffect(() => {
        function handleCanvasResize() {
            if (layerRef.current) {
                isoGrid2.current?.updateGridSize(window.innerWidth, window.innerHeight);
                layerRef.current.resizeCanvas(window.innerWidth, window.innerHeight);
            }
        }
        window.addEventListener("resize", handleCanvasResize);

        return () => {
            window.removeEventListener("resize", handleCanvasResize);
        }
    }, []);

    return (
        <CanvasLayer ref={layerRef}/>
    );
}

const IsosurfaceLayer = memo(IsoLayer);
export default IsosurfaceLayer;

