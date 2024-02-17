"use client"
import { useEffect, useRef, useState } from "react";
import { getDistance } from "./util/Distance";
import { lerp } from "./util/LinearInterpolation";
import { clamp } from "./util/ClampFunctions";
import Pair from "./util/Pair";

//TODO: WRITE UNIT TESTS FOR THIS COMPONENT
function Eye() {
    const [eyeBallY, setEyeBallY] = useState<number>(50);
    const [eyeBallX, setEyeBallX] = useState<number>(50); // Initial X-coordinate
    const innerRef = useRef<SVGSVGElement>(null);
    const timeoutRef = useRef<NodeJS.Timeout | null>(null);
    const animFrameRef = useRef<number | null>(null)

    useEffect(() => {

        const handleMouseMove = (e: MouseEvent) => {
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current)
            }
            if (animFrameRef.current) {
                cancelAnimationFrame(animFrameRef.current)
            }

            if (innerRef.current) {
                const clientRect = innerRef.current.getBoundingClientRect();
                const svgCenterX = clientRect.left + clientRect.width / 2;
                const svgCenterY = clientRect.top + clientRect.height / 2;
                
                const angle = Math.atan2(e.clientY - svgCenterY, e.clientX - svgCenterX);
                // Adjust the radius and scaling factor as needed
                const radius = 25;
                const scalingFactor = clamp(lerp(getDistance(svgCenterX, svgCenterY, e.clientX, e.clientY), 0, 28), 0, 1);
                const newX = 50 + (radius * Math.cos(angle) * scalingFactor);
                const newY = 50 + (radius * Math.sin(angle) * scalingFactor);
                // console.log("new x", newX)
                setEyeBallX(newX);
                setEyeBallY(newY);
            }
        };

        const handleMouseOut = () => {
            // console.log("mouse exit")
            timeoutRef.current = setTimeout(() => {
                const p = new Pair(Math.floor(eyeBallX), Math.floor(eyeBallY));
                const moveBack = (x:number,y:number) => { 
                    const animStep = () => {
                        const dist = getDistance(50, x, 50, y);
                        const dx = 50 - x;
                        const dy = 50 - y;
                        if (dist > 0.2) {
                            x += (dx * .11);
                            y += (dy * .11);
                            setEyeBallX(x);
                            setEyeBallY(y);
                            animFrameRef.current = requestAnimationFrame(animStep);
                        }
                    }
                    animFrameRef.current = requestAnimationFrame(animStep);
                }
                moveBack(p.X, p.Y);
            }, 1000);
        };
        window.addEventListener("mousemove", handleMouseMove);
        window.addEventListener("mouseout", handleMouseOut);
        return () => {
            window.removeEventListener("mousemove", handleMouseMove);
            window.removeEventListener("mouseout", handleMouseOut);
        }
    }, [setEyeBallX, setEyeBallY, eyeBallX, eyeBallY]);

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

const EyeBall = Eye;
export default EyeBall;
