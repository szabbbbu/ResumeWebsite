"use client"
import {useEffect, useRef} from "react"
import CanvasLayer from "./CanvasLayer"
import Circle from "../ShapeSystem/Circle";


interface I_CanvasLayer {
    getCanvasContext: () => CanvasRenderingContext2D | undefined;
}

//renders and animates the circles
export default function CanvasLayerClient() {

    const layerRef = useRef<I_CanvasLayer>(null);
    const circles: Circle[] = []

    console.log("WHAT")

    useEffect(() => {
        if (layerRef.current) {
            const ctx = layerRef.current.getCanvasContext();
            if (!ctx) return
            for (let i = 0; i < 5; i++) {
                const randRadius = Math.floor(Math.random() * 100 + 40);
                const randX = Math.floor(Math.random() * (window.innerWidth - (2*randRadius)) + randRadius);
                const randY = Math.floor(Math.random() * (window.innerHeight - (2*randRadius)) + randRadius);
                const c = new Circle(randX, randY, randRadius, ctx);
                c.drawShape()
                circles.push(c)
            }
        }
    });

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