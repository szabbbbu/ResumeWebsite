
class GridPoint {
    private X: number;
    private Y: number;
    private Val: number;
    constructor(x: number, y: number) {
        this.X = x;
        this.Y = y;
        this.Val = 0.0;
    }
    getXPos(): number {
        return this.X;
    }

    getYPos(): number {
        return this.Y;
    }

    getValue(): number {
        return this.Val;
    }
    
    calcDistanceFromPoint(pointX: number, pointY: number): void {
        this.Val = Math.sqrt(Math.pow(this.X - pointX, 2) + Math.pow(this.Y - pointY, 2))
    }

    toString(): string {
        return `GRID POINT: X: ${this.X}, Y: ${this.Y}, VALUE: ${this.Val}`;
    }
}

export default GridPoint;
