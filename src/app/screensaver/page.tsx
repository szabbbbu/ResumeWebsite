"use client"
import { useAppContext } from "@/contexts/useAppContext"
import { useEffect } from "react";

//page with nothing on it for background anim
export default function Screensaver() {
    const {menuHidden, setMenuHidden} = useAppContext();
    useEffect(() => {
        setMenuHidden(true);

    }, [])
    return (
        <></>
    )
}
