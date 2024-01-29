import { useContext } from "react";
import { IsoContext } from "./IsoContext";

export default function useIsoContext() {
    const ctx = useContext(IsoContext);
    if (!ctx) {
        throw new Error("Wrap the isosurface compoenents in the IsoContext!");
    }
    return ctx;
}