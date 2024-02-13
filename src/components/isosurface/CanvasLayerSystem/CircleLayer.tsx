"use client"
import {useEffect, useRef, memo, useCallback} from "react"
import CanvasLayer from "./CanvasLayer"
import Circle from "../ShapeSystem/Circle";
import useIsoContext from "@/contexts/isosurface/useIsoContext";
import { clamp } from "@/components/util/ClampFunctions";


interface I_CanvasLayer {
    getCanvasContext: () => CanvasRenderingContext2D | undefined;
    resizeCanvas: (w:number, h:number) => void;
}

//renders and animates the circles
function Client() {

    const { circles2} = useIsoContext();
    const layerRef = useRef<I_CanvasLayer>(null);
    const animFrameId = useRef<number | null>(null);
    // console.log("WHAT")

    const generateCircles = useCallback((ctx: CanvasRenderingContext2D) => {
            const circles: Circle[] = []
            // console.log("GENERATING CIRCLES", appWidth, appHeight, circles)
            const m = Math.min(window.innerWidth, window.innerHeight);
            // console.log("M", m/30)
            for (let i = 0; i < 7; i++) {
                let randRadius: number;
                if (i % 2 == 0) // big circle
                    randRadius = Math.floor(Math.random() * (m/16) + m/12);
                else // small circle
                    randRadius = Math.floor((Math.random() * m/20) + m/16);
                const randX = Math.floor(Math.random() * (window.innerWidth - (2*(randRadius + 60))) + randRadius + 60);
                const randY = Math.floor(Math.random() * (window.innerHeight - (2*(randRadius + 60))) + randRadius + 60);
                // console.log("rand:",appHeight, randX, randY)
                const c = new Circle(randX, randY, randRadius, ctx);
                // c.drawShape();
                circles.push(c);
            }
        // setCircles([...circles]);
        circles2.current = circles
    }, [circles2.current]);


    /** RUNS ON STARTUP */
    useEffect(() => {
        if (layerRef.current) {
            const ctx = layerRef.current.getCanvasContext();
            if (!ctx) return
            
            if (circles2.current.length === 0 && typeof window) {
                // console.log("circ?", window.innerHeight, appHeight)
                generateCircles(ctx);
            }
        }
    }, []);

    /** HANDLES ANIMATION */
    useEffect(() => {
        const animate = () => {
            //clear the canvas
            if (layerRef.current) {
                const ctx = layerRef.current.getCanvasContext();
                if (!ctx) return;
                ctx.clearRect(0,0, window.innerWidth, window.innerHeight);
            }
            circles2.current.forEach(circle => {
                circle.moveCircle()
                if (layerRef.current) {
                    const ctx = layerRef.current.getCanvasContext();
                    if (!ctx ) return
                    const cPos = circle.getPos();
                    ctx.fillStyle = "rgba(0,0,0,0.5)";
                    ctx.strokeStyle = "white"
                    ctx.lineWidth = 2
                    ctx.beginPath();
                    //TODO: make the ball bounce/radius spec more accurate, use common vals in circle.ts and here
                    ctx.arc(cPos.X, cPos.Y, clamp(circle.radius-21, 1, Number.MAX_SAFE_INTEGER), 0, 360);
                    ctx.fill();
                    ctx.stroke();
                }
                // circle.drawShape()
                // circle.getGridStatus();
            })
            animFrameId.current = requestAnimationFrame(animate);
        }
        animate();
        return () => {
            if (animFrameId.current) {
                cancelAnimationFrame(animFrameId.current);
            }
        }
    }, [])

    useEffect(() => {
        function handleCanvasResize() {
            if(layerRef.current) {
                layerRef.current.resizeCanvas(window.innerWidth, window.innerHeight);
            }
        }

        window.addEventListener("resize",handleCanvasResize);

        return () => {
            window.removeEventListener("resize", handleCanvasResize);
        }
    }, []);

    return (
        <>
            <CanvasLayer ref={layerRef}/>
        </>
    );
}

const CircleLayer = memo(Client);
export default CircleLayer;
