"use client"
import { memo, useCallback, useEffect, useRef } from "react";
import CanvasLayer from "./CanvasLayer";
import { lerp } from "../../util/LinearInterpolation";
import GridPoint from "../GridPoint";
import Pair from "../../util/Pair";
import { getDistance } from "../../util/Distance";
import {clamp, normalize} from "../../util/ClampFunctions";
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

const threshold = .7

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
        
        const sideAScalingFactor = lerp(threshold, topLeft.getValue(), topRight.getValue());
        const sideBScalingFactor = lerp(threshold, topRight.getValue(), btmRight.getValue());
        const sideCScalingFactor = lerp(threshold, btmLeft.getValue(),btmRight.getValue());
        const sideDScalingFactor = lerp(threshold, topLeft.getValue(), btmLeft.getValue());
        // console.log(sideDScalingFactor);
    
        /** Square sides */
        const sideA: Pair = new Pair(
            leftBound+dw*sideAScalingFactor,
            upBound
        ); //top side
        if (upBound <= 0) {
            console.log("BOUNCE!")
            
        }
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
        ctx.lineWidth=strokeWidth;
        // console.log("config", config)
        // Create a path for the contour
        ctx.strokeStyle ="white"
        ctx.beginPath();
        let x = 0;
        let y = 0;
        switch(currState) {
            case 0:
                break;
            case 1: //* bottom left corner */
            case 14:
                ctx.moveTo(clamp(sideD.X, 0, window.innerWidth-10), clamp(sideD.Y, 0, window.innerHeight-10));
                ctx.lineTo(clamp(sideC.X, 0, window.innerWidth-10), clamp(sideC.Y, 0, window.innerHeight-10));
                break;
            case 2: /** bottom right */
            case 13:
                ctx.moveTo(clamp(sideC.X, 0, window.innerWidth-10), clamp(sideC.Y, 0, window.innerHeight-10));
                ctx.lineTo(clamp(sideB.X, 0, window.innerWidth-10), clamp(sideB.Y, 0, window.innerHeight-10));
                break;
            case 3: /** bottom left, bottom right */
            case 12:
                ctx.moveTo(clamp(sideD.X, 0, window.innerWidth-10), clamp(sideD.Y, 0, window.innerHeight-10));

                ctx.lineTo(clamp(sideB.X, 0, window.innerWidth-10), clamp(sideB.Y, 0, window.innerHeight-10));

                break;
            case 4: /** top right */
            case 11:
                ctx.moveTo(clamp(sideA.X, 0, window.innerWidth-10), clamp(sideA.Y, 0, window.innerHeight-10));

                ctx.lineTo(clamp(sideB.X, 0, window.innerWidth-10), clamp(sideB.Y, 0, window.innerHeight-10));
                break;
            case 5: /** top right, bottom left */
                ctx.moveTo(sideD.X, sideD.Y);
                ctx.lineTo(sideA.X, sideA.Y);
                ctx.stroke();
                ctx.beginPath();
                ctx.lineTo(sideC.X, sideC.Y);
                ctx.lineTo(sideB.X, sideB.Y);
                break;
            case 6: /** top right, bottom right */
            case 9:
                ctx.moveTo(clamp(sideA.X, 0, window.innerWidth - 10), clamp(sideA.Y, 0, window.innerHeight-10));
                // ctx.moveTo(sideA.X, sideA.Y);
                // ctx.lineTo(sideC.X, sideC.Y);
                ctx.lineTo(clamp(sideC.X, 0, window.innerWidth -10), clamp(sideC.Y, 0, window.innerHeight-10));

                break;
            case 7: /** top right, bottom right, bottom left */
            case 8:
                ctx.moveTo(sideD.X, sideD.Y);
                ctx.lineTo(sideA.X, sideA.Y);
                break;
            case 10:
                ctx.moveTo(sideA.X, sideA.Y);
                ctx.lineTo(sideB.X, sideB.Y);
                ctx.stroke();
                ctx.beginPath();
                ctx.moveTo(sideD.X, sideD.Y);
                ctx.lineTo(sideC.X, sideC.Y);
                break;
            case 15:
                break;
            default:
                console.error("string generated that isn't defined in ContourStates enum")
                break;
        }
        // Draw the contour
        ctx.stroke();
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
                        let inverseSum = 0
                        circles.forEach(circle => {
                            const circlePos: Pair = circle.getPos();
                            const newDistance = getDistance(point.getXPos(), point.getYPos(), circlePos.X, circlePos.Y, circle.radius);
                            inverseSum += 1/newDistance
                            // distValuesPerCircle.push(newDistance);
                            // point.setValue(newDistance);
                        })
                    const normVal = normalize(inverseSum*100, 0, 3)
                    if (normVal >= threshold) {
                        ctx.fillStyle = "blue"
                        point.setOccupied(true)
                    }
                    else {
                        ctx.fillStyle = "#cab456"
                        point.setOccupied(false);
                    }
                    point.setValue(normVal);
            
                    if (colNum > 0 && rowNum > 0) {
                        determineContour(point, rowNum, colNum, currGrid, ctx);
                    }
                    ctx.beginPath();
                    ctx.arc(point.getXPos(), point.getYPos(), 1, 0, 360)
                    ctx.fill();
                    ctx.fillText(`${point.getValue().toFixed(2)}`, point.getXPos() + 10, point.getYPos() + 10)
                })
            })
            isoGrid2.current.setGrid(currGrid);
         }
        animFrameId.current = requestAnimationFrame(update);
    }, [isoGrid2])

    /** INITIALIZE GRID */
    useEffect(() => {
        const dim = 28;
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

