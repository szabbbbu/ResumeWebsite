"use client"
import {useEffect, useRef, memo, useCallback} from "react"
import CanvasLayer from "./CanvasLayer"
import Circle from "../ShapeSystem/Circle";
import { useAppContext } from "@/contexts/useAppContext";


interface I_CanvasLayer {
    getCanvasContext: () => CanvasRenderingContext2D | undefined;
}

//renders and animates the circles
function Client() {

    const {appWidth, appHeight, setAppWidth} = useAppContext();
    const layerRef = useRef<I_CanvasLayer>(null);
    const circles: Circle[] = []

    // console.log("WHAT")

    const generateCircles = useCallback((ctx: CanvasRenderingContext2D) => {
        console.log("DO CIRCLES EXIST?", circles.length, appWidth, appHeight);
        if (circles.length == 0) {
            for (let i = 0; i < 5; i++) {
                const randRadius = Math.floor(Math.random() * 100 + 40);
                const randX = Math.floor(Math.random() * (appWidth - (2*randRadius)) + randRadius);
                const randY = Math.floor(Math.random() * (appHeight - (2*randRadius)) + randRadius);
                const c = new Circle(randX, randY, randRadius, ctx);
                c.drawShape();
                circles.push(c);
            }
        }
        else {
            circles.forEach(circle => {
                circle.drawShape()
            })
        }
        
    }, [appWidth, appHeight])

    useEffect(() => {
        if (layerRef.current) {
            const ctx = layerRef.current.getCanvasContext();
            if (!ctx) return
            generateCircles(ctx);
        }
    }, [appWidth, appHeight]);

    /** HANDLES ANIMATION */
    useEffect(() => {
        const animate = () => {
            //clear the canvas
            if (layerRef.current) {
                const ctx = layerRef.current.getCanvasContext();
                if (!ctx) return;
                ctx.clearRect(0,0, window.innerWidth, window.innerHeight);
            }
            //movethecircles
            circles.forEach(circle => {
                
                circle.moveCircle()
            })
            requestAnimationFrame(animate);
        }
        animate();
    }, [])
    return (
        <CanvasLayer ref={layerRef}/>
    );
}

const CanvasLayerClient = memo(Client);
export default CanvasLayerClient;
