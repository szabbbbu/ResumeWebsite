import Line from "../ShapeSystem/Line";
import GridPoint from "./GridPoint";

class GridCell {

    TopLeft: GridPoint;
    TopRight: GridPoint;
    BtmLeft: GridPoint;
    BtmRight: GridPoint;

    private ContourLine_A!: Line;
    private ContourLine_B!: Line;

    constructor (topLeft: GridPoint,topRight: GridPoint,btmLeft: GridPoint,btmRight: GridPoint) {
        this.TopLeft = topLeft;
        this.TopRight = topRight;
        this.BtmLeft = btmLeft;
        this.BtmRight = btmRight;
    }
}

