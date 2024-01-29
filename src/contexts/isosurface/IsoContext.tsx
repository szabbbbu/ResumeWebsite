import Circle from "@/components/isosurface/ShapeSystem/Circle";
import { createContext } from "react";

interface IsoContext {
    circles: Circle[];
    setCircles: React.Dispatch<React.SetStateAction<Circle[]>>;
}

export const IsoContext = createContext<IsoContext | undefined>(undefined);