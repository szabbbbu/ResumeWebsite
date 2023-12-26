import GridPoint from "./GridPoint";

class GridPoints {
    private Rows: number;
    private Cols: number;
    private Width: number;
    private Height: number;
    private aspectRatio: number;
    private GridPoints: GridPoint[][] | null; //[row][col]
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
        this.GridPoints = null;
        
        console.log('aspect ratio', this.aspectRatio)
    }
    
    private assembleGrid(): GridPoint[][] {
        const newGrid: GridPoint[][] = [];
        const widthInterval: number = this.Width / this.Cols;
        const heightInterval: number = this.Height / this.Rows; 
        // console.log("WIDTH & HEIGHT INTERVALS:", widthInterval, heightInterval)

        for (let i = 0; i <= this.Rows; i++) {
            const currYLine = heightInterval * i;
            const newRow: GridPoint[] = [];
            for (let j = 0; j <= this.Cols; j++) {
                const currXLine = widthInterval * j;
                newRow.push(new GridPoint(currXLine, currYLine));
            }
            newGrid.push(newRow);
        }
        return newGrid;
    }

    getGrid(): GridPoint[][] {
        if (this.GridPoints == null) {
            this.GridPoints = this.assembleGrid();
            return this.GridPoints;
        }
        else return this.GridPoints;
    }
}

export default GridPoints;
