"use client"
import { MutableRefObject, ReactNode, useRef, useState } from "react";
import Circle from "@/components/isosurface/ShapeSystem/Circle";
import { IsoContext } from "./IsoContext";


type Props = {
    children: ReactNode;
}


export default function IsoContextProvider({children}: Props) {
    const circles2: MutableRefObject<Circle[]> = useRef<Circle[]>([]);
    return (
        <IsoContext.Provider
            value={{
                circles2: circles2
            }}
        >
            {children}
        </IsoContext.Provider>
    );

}