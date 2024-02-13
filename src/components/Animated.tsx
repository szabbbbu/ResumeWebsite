"use client"
import { memo, useEffect, useState } from "react";

type Props = {
    children: React.ReactNode;
    delay: number; //milliseconds
    height? :string;
}

function AnimatedComponent({children, delay, height="h-fit"}: Props) {
    const [show, setShow] = useState(false);
    useEffect(() => {
        setTimeout(() => {
            setShow(true);
        }, delay);
    }, [])

    return(
        <div
            className={`w-fit ${height} ${show ? "fade-in" : "start-state"}`}
        >
            {children}
        </div>
    );
}

const Animated = memo(AnimatedComponent);
export default Animated;
