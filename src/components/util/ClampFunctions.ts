
export function clamp(x: number, min: number, max: number): number {
    if (x < min) x = min;
    if (x > max) x = max;
    return x;
}

export function normalize(x: number, minBound: number, maxBound: number): number {
    if (minBound >= maxBound) {
        throw new Error("min bound must be less than max bound!");
    }
    return (x - minBound) / (maxBound - minBound)
}
