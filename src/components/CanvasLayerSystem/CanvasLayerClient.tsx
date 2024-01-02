"use client"
import {useEffect, useRef} from "react"
import CanvasLayer from "./CanvasLayer"
import Circle from "../ShapeSystem/Circle";
import Pair from "../util/Pair";


interface I_CanvasLayer {
    getCanvasContext: () => CanvasRenderingContext2D | undefined;
}

//renders and animates the circles
export default function CanvasLayerClient() {

    const layerRef = useRef<I_CanvasLayer>(null);
    const circles: Circle[] = []

    useEffect(() => {
        if (layerRef.current) {
            const ctx = layerRef.current.getCanvasContext();
            console.log(ctx);
            // const c1 = new Circle(100, 100, 30, ctx)
            for (let i = 0; i < 5; i++) {
                const c = new Circle(100 + (i * 20),100 , 50, ctx);
                c.drawShape()
                circles.push(c)
                // c.drawShape("white", "transparent");
                // console.log("whi")
            }
            // c1.drawShape("white", "transparent");
        }
    });




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

    return (
        <CanvasLayer ref={layerRef}/>
    );
}