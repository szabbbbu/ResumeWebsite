"use client"
import { ReactNode, useState } from "react";
import Circle from "@/components/isosurface/ShapeSystem/Circle";
import { IsoContext } from "./IsoContext";


type Props = {
    children: ReactNode;
}


export default function IsoContextProvider({children}: Props) {
    const [circles, setCircles] = useState<Circle[]>([]);
    return (
        <IsoContext.Provider
            value={{
                circles: circles,
                setCircles: setCircles
            }}
        >
            {children}
        </IsoContext.Provider>
    );

}