"use client";

import {useEffect, useRef} from "react"
import CanvasLayer from "./CanvasLayer"

interface I_CanvasLayer {
    getCanvasContext: () => CanvasRenderingContext2D | null;
}

//renders the debug layer (grid)
export default function CanvasLayerClientDebug() {

    const layerRef = useRef<I_CanvasLayer>(null);

    useEffect(() => {
        if (layerRef.current) {
            console.log("yes");
            const ctx = layerRef.current.getCanvasContext();
            console.log(ctx);
            
        }
    }, []);

    return (
        <CanvasLayer ref={layerRef}/>
    );
}
