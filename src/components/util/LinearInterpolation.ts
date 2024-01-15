import { clamp } from "./Clamp";

export function lerp(
    value: number,
    originalMin: number,
    originalMax: number,
    newMin=0,
    newMax=1
  ): number {
    const newValue = newMin + ((value - originalMin) * (newMax - newMin)) / (originalMax - originalMin);
  
    return clamp(newValue, 0, 1);
  }