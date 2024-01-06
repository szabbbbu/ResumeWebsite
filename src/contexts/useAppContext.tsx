"use client"
import { useContext } from "react";
import { AppContext } from "./AppContext";

export function useAppContext() {
    const context = useContext(AppContext)
    if (!context) {
        throw new Error("WRAP YOUR ELEMENT IN THE APP CONTEXT PROVIDER TO USE APP CONTEXT");
    }
    return context;
}
