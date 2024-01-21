
export function getDistance(fromX: number, fromY: number, toX: number, toY: number) {
    return Math.sqrt(Math.pow(fromX - toX, 2) + Math.pow(fromY - toY, 2));

}
