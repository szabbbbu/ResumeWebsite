"use client"
import { memo, useEffect, useState } from "react";

type Props = {
    children: React.ReactNode;
    delay: number; //milliseconds
}

function AnimatedComponent({children, delay}: Props) {
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

const Animated = memo(AnimatedComponent);
export default Animated;
