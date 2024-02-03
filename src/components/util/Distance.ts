
export function getDistance(fromX: number, fromY: number, toX: number, toY: number, rad: number) {
    const dist = Math.sqrt(Math.pow(fromX - toX, 2) + Math.pow(fromY - toY, 2));
    if (dist <= 0) {
        return 0;
    }
    else {
        return dist
    }
}
