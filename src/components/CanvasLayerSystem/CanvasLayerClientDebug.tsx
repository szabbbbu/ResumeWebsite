"use client";

import {useEffect, useRef} from "react"
import CanvasLayer from "./CanvasLayer"
import { useAppContext } from "@/contexts/useAppContext";

interface I_CanvasLayer {
    getCanvasContext: () => CanvasRenderingContext2D | null;
}

//renders the debug layer (grid)
export default function CanvasLayerClientDebug() {
    const {isoGrid, appWidth, appHeight ,circles} = useAppContext()
    const layerRef = useRef<I_CanvasLayer>(null);

    const assembleGrid = () => {
        /** ASSEMBLE GRID HERE */
        if (layerRef.current) {
            const ctx: CanvasRenderingContext2D | null = layerRef.current.getCanvasContext();
            if (!ctx) return;
            ctx.clearRect(0,0,appWidth, appHeight)

            circles.forEach(circle => {
                const coveredPoints = circle.getEnvelopedPoints();
                coveredPoints.forEach(point => {
                    ctx.fillStyle = "white"
                    ctx.beginPath();
                    ctx.arc(point.getXPos(), point.getYPos(), 2, 0, 360)
                    ctx.fill();
                    ctx.fillText(String(point.getValue().toFixed(2)), point.getXPos()+ 5, point.getYPos() + 10);
                });
            });
        }
    }

    useEffect(() => {
        const update = () => {
            assembleGrid();
            requestAnimationFrame(update);
        }
        update();
    }, [])

    return (
        <CanvasLayer ref={layerRef}/>
    );
}
