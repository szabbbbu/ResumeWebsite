"use client"
import {useEffect, useRef, memo, useCallback} from "react"
import CanvasLayer from "./CanvasLayer"
import Circle from "../ShapeSystem/Circle";
import { useAppContext } from "@/contexts/useAppContext";


interface I_CanvasLayer {
    getCanvasContext: () => CanvasRenderingContext2D | undefined;
    resizeCanvas: (w:number, h:number) => void;
}

//renders and animates the circles
function Client() {

    const {appWidth, appHeight, circles, setCircles} = useAppContext();
    const layerRef = useRef<I_CanvasLayer>(null);
    // console.log("WHAT")

    const generateCircles = useCallback((ctx: CanvasRenderingContext2D) => {
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
                c.drawShape();
                circles.push(c);
            }
        setCircles([...circles]);
    }, [ circles]);


    /** RUNS ON STARTUP */
    useEffect(() => {
        if (layerRef.current) {
            const ctx = layerRef.current.getCanvasContext();
            if (!ctx) return
            
            if (circles.length === 0 && typeof window) {
                console.log("circ?", window.innerHeight, appHeight)
                generateCircles(ctx);
            }
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
            circles.forEach(circle => {
                circle.moveCircle()
                circle.drawShape()
                // circle.getGridStatus();
            })
            setCircles([...circles])
            requestAnimationFrame(animate);
        }
        animate();
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

const CanvasLayerClient = memo(Client);
export default CanvasLayerClient;
