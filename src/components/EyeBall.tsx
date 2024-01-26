"use client"
import { useEffect, useRef, useState } from "react";
import Pair from "./util/Pair";
import { getDistance } from "./util/Distance";
import { lerp } from "./util/LinearInterpolation";
import { clamp } from "./util/ClampFunctions";

type Props = {
    pos: "left" | "right";
}

export default function EyeBall() {
    const [eyeBallY, setEyeBallY] = useState<number>(50);
    const [eyeBallX, setEyeBallX] = useState<number>(50); // Initial X-coordinate
    const innerRef = useRef<SVGSVGElement>(null);

    useEffect(() => {
    
        const handleMouseMove = (e: MouseEvent) => {
            if (innerRef.current) {
                const clientRect = innerRef.current.getBoundingClientRect();
        
                const svgCenterX = clientRect.left + clientRect.width / 2;
                const svgCenterY = clientRect.top + clientRect.height / 2;
        
                const angle = Math.atan2(e.clientY - svgCenterY, e.clientX - svgCenterX);
                console.log("angle, ", angle)
                // Adjust the radius and scaling factor as needed
                const radius = 25;
                const scalingFactor = lerp(getDistance(clientRect.x, clientRect.y, e.clientX, e.clientY), 0, 50);
                console.log("SCALING FACTOR", scalingFactor)
                const newX = 50 + (radius * Math.cos(angle) * scalingFactor);
                const newY = 50 + (radius * Math.sin(angle) * scalingFactor);
                console.log("y offset", radius * Math.sin(angle))
                // const newY = svgCenterY + radius * Math.sin(angle);
        
                setEyeBallX(newX);
                setEyeBallY(newY);
            }
        };

        window.addEventListener("mousemove", handleMouseMove);

        return () => {
            window.removeEventListener("mousemove", handleMouseMove);
        }
    }, []);

    return (
        <svg
            ref={innerRef}
            className="mx-2"
            viewBox="0 0 100 100"
            width={50}
            height={50}
        >
            <circle cx="50" cy="50" r="46" fill="white" stroke="white" strokeWidth={4}></circle>
            <circle cx={eyeBallX} cy={eyeBallY} r="18" stroke="white" strokeWidth={2}></circle>
        </svg>
    );
}
