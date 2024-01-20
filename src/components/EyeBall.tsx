"use client"

import { useEffect, useState } from "react";
import Pair from "./util/Pair";

export default function EyeBall() {
    const [mousePos, setMousePos] = useState<Pair>(new Pair(0,0));
    const [eyeBallY, setEyeBallY] = useState<number>(0);
    const [eyeBallX, setEyeBallX] = useState<number>(0);

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            mousePos.X = e.clientX;
            mousePos.Y = e.clientY;
            setMousePos(mousePos);
            console.log("angle", Math.atan2(e.clientX - 50, e.clientY - 50))
            console.log("newX", 50 + 28*Math.cos(Math.atan2(e.clientX - 50, e.clientY - 50)));
            setEyeBallY(50 + 28*Math.cos(Math.atan2(e.clientX - 50, e.clientY - 50)))
            setEyeBallX(50 + 28*Math.sin(Math.atan2(e.clientX - 50, e.clientY - 50)))
        }
        
        addEventListener("mousemove", (event) => handleMouseMove(event));

        return () => {
            removeEventListener("mousemove", handleMouseMove)
        }

    }, [mousePos, setMousePos]);

    return (
        <svg 
        className="mx-2"
        viewBox="0 0 100 100" width={50} height={50}>
            <circle cx="50" cy="50" r="46" fill="white" stroke="white" strokeWidth={4}>
            </circle>
            <circle cx={eyeBallX} cy={eyeBallY} r="18" stroke="white" strokeWidth={2}></circle>
        </svg>
    );
}
