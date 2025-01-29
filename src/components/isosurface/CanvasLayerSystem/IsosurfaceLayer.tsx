"use client"
import { useCallback, useEffect, useRef } from "react";
import CanvasLayer from "./CanvasLayer";
import { lerp } from "../../util/LinearInterpolation";
import GridPoint from "../GridPoint";
import Pair from "../../util/Pair";
import { getDistance } from "../../util/Distance";
import {clamp} from "../../util/ClampFunctions";
import Grid from "../Grid";
import useIsoContext from "@/contexts/isosurface/useIsoContext";
// import { useAppContext } from "@/contexts/useAppContext";


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

//TODO: determine to initialize threshold to 0.75(wide) or 1.2(narrow) bases on screen width on mount

function drawEdgeCase(
fromX: number,
fromY: number,
toX: number,
toY:number,
ctx: CanvasRenderingContext2D) {
    ctx.stroke();
    ctx.strokeStyle = `hsla(${400 - (220*lerp(fromX, 0, window.innerWidth))}, 100%, ${44+ 34*lerp(fromX, 0, window.innerWidth)}%)`;
    ctx.beginPath();
    ctx.moveTo(fromX, fromY);
    ctx.lineTo(toX, toY);
}   

function IsoLayer() {
    const layerRef = useRef<I_CanvasLayer>(null);
    const {circles2} = useIsoContext();
    const animFrameId = useRef<number | null>(null)
    const threshold = useRef<number>(0);
    const dim = useRef<number>(64);
    const isoGrid2 = useRef<Grid | null>(null);
    const mobLim = 768;

    function determineContour(
        btmRight: GridPoint,
        rowNum: number,
        colNum: number,
        currGrid: GridPoint[][],
        ctx: CanvasRenderingContext2D
    ) {
        if (!isoGrid2.current) return;
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
        
        const sideAScalingFactor = lerp(threshold.current, topLeft.getValue(), topRight.getValue());
        const sideBScalingFactor = lerp(threshold.current, topRight.getValue(), btmRight.getValue());
        const sideCScalingFactor = lerp(threshold.current, btmLeft.getValue(),btmRight.getValue());
        const sideDScalingFactor = lerp(threshold.current, topLeft.getValue(), btmLeft.getValue());
        // console.log(sideDScalingFactor);
        const f = 0
        /** Square sides */
        const sideA: Pair = new Pair(
            clamp(leftBound+dw*sideAScalingFactor, f, window.innerWidth-f),
            clamp(upBound, f, window.innerHeight-f)
        ); //top side
        const sideB: Pair = new Pair(
            clamp(rightBound,f, window.innerWidth-f),
            clamp(upBound+dh*sideBScalingFactor, f, window.innerHeight-f)
        );
        const sideC = new Pair( // btm side
            clamp(leftBound+dw*sideCScalingFactor,f, window.innerWidth-f),
            clamp(downBound, f, window.innerHeight-f)
        );
        const sideD: Pair = new Pair( //left side
            clamp(leftBound, f, window.innerWidth-f),
            clamp(upBound+dh*sideDScalingFactor, f, window.innerHeight-f)
        );
        
        const config = [topLeft.getOccupied(), topRight.getOccupied(), btmRight.getOccupied(), btmLeft.getOccupied()]; // gets square occupations
        const s: string = config.toString();
        // console.log(contourStates[s])
        const currState: number = ContourStates[s as keyof typeof ContourStates];
        const strokeWidth = 3;
        ctx.lineWidth=strokeWidth;

        // Create a path for the contour
        
        ctx.beginPath();
        switch(currState) {
            case 0:
                break;
            case 1: //* bottom left corner */
            case 14:
                ctx.strokeStyle =`hsla(${400 - (220*lerp(sideD.X, 0, window.innerWidth))}, 100%, ${44+ 34*lerp(sideD.X, 0, window.innerWidth)}%)`
                ctx.moveTo(sideD.X, sideD.Y);
                ctx.lineTo(sideC.X, sideC.Y);

                if (colNum == 1 && currState == 14) {
                    drawEdgeCase(0, sideD.Y, 0, upBound, ctx);
                }
                if (rowNum == currGrid.length - 1 && currState == 14) {
                    drawEdgeCase(sideC.X, window.innerHeight, rightBound, window.innerHeight, ctx);
                }
                
                break;
            case 2: /** bottom right */
            case 13:
                ctx.strokeStyle =`hsla(${400 - (220*lerp(sideC.X, 0, window.innerWidth))}, 100%, ${44+ 34*lerp(sideC.X, 0, window.innerWidth)}%)`
                ctx.moveTo(sideC.X, sideC.Y);
                ctx.lineTo(sideB.X, sideB.Y);
                if (colNum == currGrid[0].length-1) {
                    if (currState == 13)
                        drawEdgeCase(window.innerWidth, sideB.Y, window.innerWidth, upBound, ctx);
                    // if (currState == 13)
                    //     drawEdgeCase(window.innerWidth, sideB.Y, window.innerWidth, )
                }
                if (rowNum == currGrid.length - 1 && currState == 13) {
                    drawEdgeCase(sideC.X, window.innerHeight, leftBound, window.innerHeight, ctx);
                }
                break;
            case 3: /** bottom left, bottom right */
            case 12:
                ctx.strokeStyle =`hsla(${400 - (220*lerp(sideD.X, 0, window.innerWidth))}, 100%, ${44+ 34*lerp(sideD.X, 0, window.innerWidth)}%)`
                ctx.moveTo(sideD.X, sideD.Y);
                ctx.lineTo(sideB.X, sideB.Y);

                if (colNum == 1) {
                    if (currState == 12) {
                        drawEdgeCase(0, sideD.Y, 0, upBound, ctx);
                    }
                    if (currState == 3) {
                        drawEdgeCase(0, sideD.Y, 0, downBound, ctx);
                    }
                }
                if (colNum == currGrid[0].length - 1) {
                    if (currState == 12) {
                        drawEdgeCase(window.innerWidth, sideB.Y, window.innerWidth, upBound, ctx);
                    }
                    else if (currState == 3) {
                        drawEdgeCase(window.innerWidth, sideB.Y, window.innerWidth, downBound, ctx);
                    }
                }
                
                break;
            case 4: /** top right */
            case 11:
                ctx.strokeStyle =`hsla(${400 - (220*lerp(sideA.X, 0, window.innerWidth))}, 100%, ${44+ 34*lerp(sideA.X, 0, window.innerWidth)}%)`
                ctx.moveTo(sideA.X, sideA.Y);
                ctx.lineTo(sideB.X, sideB.Y);
                if (colNum == currGrid[0].length - 1) {
                    if (currState == 11)
                        drawEdgeCase(window.innerWidth, sideB.Y, window.innerWidth, downBound, ctx);
                    // else if (currState == 11)
                }
                if (rowNum == 1 && currState == 11) {
                    drawEdgeCase(sideA.X, 0, leftBound, 0, ctx);
                }
                // else if (rowNum == currGrid[0].length - 1 && currState == 11) {
                //     drawEdgeCase(window.innerWidth, sideB.Y, window.innerWidth, downBound, ctx)
                // }
                break;
            case 5: /** top right, bottom left */
                ctx.strokeStyle =`hsla(${400 - (220*lerp(sideA.X, 0, window.innerWidth))}, 100%, ${44+ 34*lerp(sideA.X, 0, window.innerWidth)}%)`
                ctx.moveTo(sideD.X, sideD.Y);
                ctx.lineTo(sideA.X, sideA.Y);
                ctx.stroke();
                ctx.beginPath();
                ctx.lineTo(sideC.X, sideC.Y);
                ctx.lineTo(sideB.X, sideB.Y);
                break;
            case 6: /** top right, bottom right */
            case 9:
                ctx.strokeStyle =`hsla(${400 - (220*lerp(sideA.X, 0, window.innerWidth))}, 100%, ${44+ 34*lerp(sideA.X, 0, window.innerWidth)}%)`
                ctx.moveTo(sideA.X,sideA.Y);
                // ctx.moveTo(sideA.X, sideA.Y);
                // ctx.lineTo(sideC.X, sideC.Y);
                ctx.lineTo(sideC.X, sideC.Y);

                if (rowNum == 1) {
                    if (currState == 9) {
                        drawEdgeCase(sideA.X, 0, leftBound, 0, ctx);
                    }
                    else if (currState == 6) {
                        drawEdgeCase(sideA.X, 0, rightBound, 0, ctx);
                    }
                }
                if (rowNum == currGrid.length - 1) {
                    if (currState == 9) {
                        drawEdgeCase(sideC.X, window.innerHeight, leftBound, window.innerHeight, ctx);
                    }
                    else if (currState == 6) {
                        drawEdgeCase(sideC.X, window.innerHeight, rightBound, window.innerHeight, ctx);
                    }
                }
                break;
            case 7: /** top right, bottom right, bottom left */
            case 8:
                ctx.strokeStyle =`hsla(${400 - (220*lerp(sideD.X, 0, window.innerWidth))}, 100%, ${44+ 34*lerp(sideD.X, 0, window.innerWidth)}%)`
                ctx.moveTo(sideD.X, sideD.Y);
                ctx.lineTo(sideA.X, sideA.Y);
                if (rowNum == 1 && currState == 7) {
                    drawEdgeCase(sideA.X, 0, rightBound, 0, ctx);
                }
                if (colNum == 1 && currState == 7) {
                    drawEdgeCase(0, sideD.Y, 0, downBound, ctx);
                }
                break;
            case 10:
                ctx.strokeStyle =`hsla(${400 - (220*lerp(sideA.X, 0, window.innerWidth))}, 100%, ${44+ 34*lerp(sideA.X, 0, window.innerWidth)}%)`;
                ctx.moveTo(sideA.X, sideA.Y);
                ctx.lineTo(sideB.X, sideB.Y);
                ctx.stroke();
                ctx.beginPath();
                ctx.moveTo(sideD.X, sideD.Y);
                ctx.lineTo(sideC.X, sideC.Y);
                break;
            case 15: //all squares occupied
            ctx.strokeStyle =`hsla(${400 - (220*lerp(leftBound, 0, window.innerWidth))}, 100%, ${44+ 34*lerp(leftBound, 0, window.innerWidth)}%)`;
            if (rowNum == 1) {
                ctx.moveTo(leftBound, 0);
                ctx.lineTo(rightBound, 0);
            }
            else if (rowNum == currGrid.length - 1) {

                ctx.moveTo(leftBound, window.innerHeight);
                ctx.lineTo(rightBound, window.innerHeight);
                
            }
            if (colNum == 1) {
                ctx.strokeStyle =`hsla(${400 - (220*lerp(0, 0, window.innerWidth))}, 100%, ${44+ 34*lerp(0, 0, window.innerWidth)}%)`;
                ctx.moveTo(0, upBound);
                ctx.lineTo(0, downBound);
            
            }
            else if (colNum == currGrid[0].length - 1) {
                ctx.strokeStyle =`hsla(${400 - (220*lerp(window.innerWidth, 0, window.innerWidth))}, 100%, ${44+ 34*lerp(window.innerWidth, 0, window.innerWidth)}%)`;
                ctx.moveTo(window.innerWidth, upBound);
                ctx.lineTo(window.innerWidth, downBound);
            }
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

                    //ADD INVERSE SUM OF DISTANCES PER CIRCLE
                    circles2.current.forEach(circle => {
                        const circlePos: Pair = circle.getPos();
                        const newDistance = getDistance(point.getXPos(), point.getYPos(), circlePos.X, circlePos.Y);
                        const influence = Math.exp(-newDistance / circle.radius); // Use EXPONENTIAL DECAY
                        inverseSum += influence;
                        distValuesPerCircle.push(newDistance);
                        // point.setValue(newDistance);
                    });
                    // const normVal = normalize(inverseSum*100, 0, 3); 
                    const normVal = inverseSum*6
                    if (normVal >= threshold.current) {
                        ctx.fillStyle = "blue";
                        point.setOccupied(true);
                    }
                    else {
                        ctx.fillStyle = "#cab456"
                        point.setOccupied(false);
                    }
                    point.setValue(normVal);
                
                    if (colNum > 0 && rowNum > 0) {
                        determineContour(point, rowNum, colNum, currGrid, ctx);
                    }
                    // ctx.beginPath();
                    // ctx.arc(point.getXPos(), point.getYPos(), 1, 0, 360)
                    // ctx.fill();
                    // ctx.fillText(`${point.getValue().toFixed(2)}`, point.getXPos() + 10, point.getYPos() + 10)
                })
            })
            isoGrid2.current.setGrid(currGrid);
         }
        animFrameId.current = requestAnimationFrame(update);
    }, [isoGrid2, threshold.current])

    /** INITIALIZE GRID */
    useEffect(() => {
        threshold.current = (window.innerWidth < mobLim) ? 0.5 : 1;
        dim.current = (window.innerWidth < mobLim) ? 10 : 64;
        const w = window.innerWidth;
        const h = window.innerHeight;
        const gridInstance = new Grid(dim.current, w, h);
        isoGrid2.current = gridInstance;
        if (layerRef.current) {
            const ctx = layerRef.current.getCanvasContext();
            if (ctx) {
                ctx.imageSmoothingEnabled = true;
                ctx.imageSmoothingQuality = "high";
            }
        }   
        //start marching squares
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
                if (window.innerWidth > mobLim && dim.current == 8) {
                    // console.log("reinit grid", dim.current)
                    dim.current = 64;
                    const gridInstance = new Grid(64, window.innerWidth, window.innerHeight);
                    isoGrid2.current = gridInstance;
                }
                else if (window.innerWidth <= mobLim && dim.current == 64) {
                    // console.log("reinit grid", dim.current)
                    dim.current = 8;
                    const gridInstance = new Grid(8, window.innerWidth, window.innerHeight);
                    isoGrid2.current = gridInstance;
                }
                isoGrid2.current?.updateGridSize(window.innerWidth, window.innerHeight);
                layerRef.current.resizeCanvas(window.innerWidth, window.innerHeight);
                threshold.current = lerp(window.innerWidth, 300, 2100, 1, 2.0);
            }
        }
        handleCanvasResize();
        window.addEventListener("resize", handleCanvasResize);

        return () => {
            window.removeEventListener("resize", handleCanvasResize);
        }
    }, []);

    return (
        <CanvasLayer ref={layerRef}/>
    );
}

const IsosurfaceLayer = IsoLayer;
export default IsosurfaceLayer;

