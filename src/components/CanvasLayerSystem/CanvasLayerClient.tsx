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

    useEffect(() => {
        if (layerRef.current) {
            const ctx = layerRef.current.getCanvasContext();
            console.log(ctx);
            const c1 = new Circle(100, 100, 30, ctx)
            c1.drawShape("white", "transparent");
        }
    }, []);

    return (
        <CanvasLayer ref={layerRef}/>
    );
}