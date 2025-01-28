"use client"

import { useEffect, useState } from "react";

export default function HomepageContent() {
    const [show, setShow] = useState<boolean>(false);

    useEffect(() => {
        setShow(true);
    }, [])

    return(
        <div className={`w-[50%] h-[25%] add-blur flex flex-col justify-start items-center rounded-md ${show ? "fade-in" : "start-state"}`} >
            <h1 className="text-xl uppercase my-2">robert szabo</h1>
            <div>Full Stack Engineer</div>
            <div></div>
        </div>
    );
}