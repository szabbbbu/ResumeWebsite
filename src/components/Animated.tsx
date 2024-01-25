"use client"
import { useEffect, useState } from "react";

type Props = {
    children: React.ReactNode;
    delay: number; //milliseconds
}

export default function Animated({children, delay}: Props) {
    const [show, setShow] = useState(false);

    useEffect(() => {
        setTimeout(() => {
            setShow(true);
        }, delay);
    }, [])

    return(
        <div
            className={`w-fit h-fit ${show ? "fade-in" : "start-state"}`}
        >
            {children}
        </div>
    );
}