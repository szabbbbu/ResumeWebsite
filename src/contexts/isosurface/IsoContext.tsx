import Circle from "@/components/isosurface/ShapeSystem/Circle";
import { MutableRefObject, createContext } from "react";

interface IsoContext {
    circles: Circle[];
    setCircles: React.Dispatch<React.SetStateAction<Circle[]>>;
    circles2: MutableRefObject<Circle[]>;
}

export const IsoContext = createContext<IsoContext | undefined>(undefined);
