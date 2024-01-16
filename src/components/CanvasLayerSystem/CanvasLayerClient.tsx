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

    const {appWidth, appHeight, circles, setCircles} = useAppContext();
    const layerRef = useRef<I_CanvasLayer>(null);
    // console.log("WHAT")

    const generateCircles = useCallback((ctx: CanvasRenderingContext2D) => {
        if (circles.length == 0) {
            for (let i = 0; i < 7; i++) {
                let randRadius: number;
                if (i % 2 == 0) // big circle
                    randRadius = Math.floor(Math.random() * 100 + 80);
                else // small circle
                    randRadius = Math.floor(Math.random() * 60 + 40);
                const randX = Math.floor(Math.random() * (appWidth - (2*(randRadius + 60))) + randRadius + 60);
                const randY = Math.floor(Math.random() * (appHeight - (2*(randRadius + 60))) + randRadius + 60);
                console.log("rand:",appHeight, randX, randY)
                const c = new Circle(randX, randY, randRadius, ctx);
                c.drawShape();
                circles.push(c);
            }
        }
        else {
            if (Array.isArray(circles))
            circles.forEach(circle => {
                circle.drawShape()
            })
        }
        setCircles({...circles});
    }, [appWidth, appHeight, circles])

    useEffect(() => {
        if (layerRef.current) {
            const ctx = layerRef.current.getCanvasContext();
            if (!ctx) return
            // console.log("regen grid")
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
            if (Array.isArray(circles))
            circles.forEach(circle => {
                circle.moveCircle()
                // circle.getGridStatus();
            })
            setCircles({...circles})
            requestAnimationFrame(animate);
        }
        animate();
    }, [])

    return (
        <>
            <CanvasLayer ref={layerRef}/>
        </>
    );
}

const CanvasLayerClient = memo(Client);
export default CanvasLayerClient;
