
class GridPoint {
    private X: number;
    private Y: number;
    private Val: number;
    private isOccupied: boolean;
    constructor(x: number, y: number) {
        this.X = x;
        this.Y = y;
        this.Val = Number.MAX_VALUE; // lowest distance value
        // this.occupyingCircleRadius: Number;
        this.isOccupied = false;
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

    setOccupied(newBool: boolean) {
        this.isOccupied = newBool;
    }

    getOccupied():boolean {
        return this.isOccupied;
    }
    setValue(newVal: number): void {
        this.Val = newVal;
    }



    toString(): string {
        return `GRID POINT: X: ${this.X}, Y: ${this.Y}, VALUE: ${this.Val}`;
    }
}

export default GridPoint;
