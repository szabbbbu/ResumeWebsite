import Shape from "./Shape";
import Pair from "../util/Pair";
import GridPoint from "../isosurface/GridPoint";
import Grid from "../isosurface/Grid";
import { lerp } from "../util/LinearInterpolation";

class Circle extends Shape {

    public radius: number;
    protected BoundaryTop!: number; //! signifies it will be instantiated outside constuctor
    protected BoundaryBtm!: number;
    protected BoundaryRight!: number;
    protected BoundaryLeft!: number;
    protected Direction: Pair; //the vector dictating direction of circle movement
    protected Speed: number;

    protected EnvelopedPoints: Set<GridPoint>;

    constructor(x: number, y: number, radius: number, ctx: CanvasRenderingContext2D | null) {
        super(x, y, ctx);
        this.radius = radius;
        this.calcHitboxBoundaries();
        const randomVx = Math.floor((Math.random() * 80) - 40);
        const randomVy = Math.floor((Math.random() * 80) - 40);
        this.Direction = new Pair(randomVx, randomVy);
        this.EnvelopedPoints = new Set<GridPoint>();
        this.Speed = (Math.random()*1.2 + .1);
        // this.Speed = .25;
    }

    getBoundaries() {
        return [this.BoundaryTop, this.BoundaryRight, this.BoundaryBtm, this.BoundaryLeft];
    }

    calcHitboxBoundaries() {
        this.BoundaryTop = this.position.Y - this.radius  - 60;
        this.BoundaryBtm = this.position.Y + this.radius + 60;
        this.BoundaryLeft = this.position.X - this.radius - 60;
        this.BoundaryRight = this.position.X + this.radius + 60;
    }

    moveCircle(): void {
        //calculate vector magnitude
        /** track boundaries, ensure items aren't stuck */
        if (this.BoundaryLeft <= 0) {
            this.Direction.X = Math.abs(this.Direction.X);
        }
        if (this.BoundaryRight >= window.innerWidth) {
            this.Direction.X = Math.abs(this.Direction.X) * -1;
        }
        if (this.BoundaryTop <= 0) {
            this.Direction.Y = Math.abs(this.Direction.Y);
        }
        if (this.BoundaryBtm >= window.innerHeight) {
            this.Direction.Y = Math.abs(this.Direction.X) * -1;
        }
        const magnitude: number = Math.sqrt(Math.pow(this.Direction.X, 2) + Math.pow(this.Direction.Y, 2));

        // create the "normalized" vector
        const normalizedVec: Pair = new Pair(this.Direction.X / magnitude, this.Direction.Y / magnitude);
        const displacement = [this.Speed * normalizedVec.X, this.Speed * normalizedVec.Y];
        const newPos = new Pair(this.position.X + displacement[0], this.position.Y + displacement[1]);
        this.setPos(newPos);
        this.calcHitboxBoundaries();
        this.drawShape();
    }

    drawShape(fill: string="transparent", stroke: string="white") {
        const ctx = super.getContext();
        if (!ctx) return;
        // ctx.clearRect(0,0, ctx.canvas.width, ctx.canvas.height);
        ctx.imageSmoothingEnabled = true;
        const pos = super.getPos();
        ctx.beginPath();
        ctx.arc(pos.X, pos.Y, this.radius, 0, 360)
        ctx.fillStyle = `rgb(0,0,0)`;
        ctx.lineWidth = 4;
        ctx.strokeStyle = `rgb(${255 * 1-lerp(this.position.X, 0, 1470)},${255 * lerp(this.position.Y, 0, 1470)},${255 * lerp(this.position.X, 0, 1470)})`;
        ctx.fill();
        ctx.stroke();
    }

    getEnvelopedPoints() {
        return this.EnvelopedPoints;
    }
}


export default Circle;
