
export function clamp(x: number, min: number, max: number) {
    if (x < min) x = min;
    if (x > max) x = max;
    return x;
}