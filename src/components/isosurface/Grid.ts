import GridPoint from "./GridPoint";
import Circle from "../ShapeSystem/Circle";

class GridPoints {
    private Rows: number;
    private Cols: number;
    private Width: number;
    private Height: number;
    private aspectRatio: number;
    private widthInterval!: number;
    private heightInterval!: number;
    private GridPoints: GridPoint[][]; //[row][col]
    // private GridCells: GridCell[][] | null;
    // private GridCells:

    constructor(dim: number, width: number, height: number) {
        if (dim < 2) {
            throw new Error("make a grid with more than 2 rows/cols");
        }
        this.aspectRatio = width / height;
        this.Rows = Math.floor(dim / this.aspectRatio);
        this.Cols = dim;
        this.Width = width;
        this.Height = height;
        this.widthInterval = this.Width / this.Cols;
        this.heightInterval = this.Height / this.Rows;
        this.GridPoints = this.assembleGridPoints();
    }
    
    private assembleGridPoints(): GridPoint[][] {
        const newGrid: GridPoint[][] = [];
        for (let i = 0; i <= this.Rows; i++) {
            const currYLine = this.heightInterval * i;
            const newRow: GridPoint[] = [];
            for (let j = 0; j <= this.Cols; j++) {
                const currXLine = this.widthInterval * j;
                newRow.push(new GridPoint(currXLine, currYLine));
            }
            newGrid.push(newRow);
        }
        return newGrid;
    }

    getGrid(): GridPoint[][] {
        return this.GridPoints;
    }

    setGrid(newGrid: GridPoint[][]): void {
        this.GridPoints = newGrid
    }

    getWidthInterval(): number {
        return this.widthInterval;
    }

    getHeightInterval(): number {
        return this.heightInterval;
    }
}

export default GridPoints;
