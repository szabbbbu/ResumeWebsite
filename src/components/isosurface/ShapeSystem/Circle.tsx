import Shape from "./Shape";
import Pair from "../../util/Pair";
import GridPoint from "../GridPoint";
import Grid from "../Grid";
import { lerp } from "../../util/LinearInterpolation";

class Circle extends Shape {

    public radius: number;
    protected BoundaryTop!: number; //! signifies it will be instantiated outside constuctor
    protected BoundaryBtm!: number;
    protected BoundaryRight!: number;
    protected BoundaryLeft!: number;
    protected Direction: Pair; //the vector dictating direction of circle movement
    protected Speed: number;

    constructor(x: number, y: number, radius: number, ctx: CanvasRenderingContext2D | null,) {
        super(x, y, ctx);
        this.calcHitboxBoundaries();
        this.radius = radius;
        const randomVx = Math.floor((Math.random() * 80) - 40);
        const randomVy = Math.floor((Math.random() * 80) - 40);
        this.Direction = new Pair(randomVx, randomVy);
        this.Speed = (Math.random()*1.2 + .1);
    
    }

    getBoundaries() {
        return [this.BoundaryTop, this.BoundaryRight, this.BoundaryBtm, this.BoundaryLeft];
    }

    calcHitboxBoundaries() {
        this.BoundaryTop = this.position.Y - this.radius;
        this.BoundaryBtm = this.position.Y + this.radius;
        this.BoundaryLeft = this.position.X - this.radius;
        this.BoundaryRight = this.position.X + this.radius;
    }

    bounceCircle(): void {
        if (this.BoundaryLeft <= 0) {
            this.Direction.X = Math.abs(this.Direction.X);
            this.Speed = Math.random() *1.2 + .1
        }
        if (this.BoundaryRight >= window.innerWidth) {
            this.Direction.X = Math.abs(this.Direction.X) * -1;
            this.Speed = Math.random()*1.2 + .1

        }
        if (this.BoundaryTop <= 0) {
            this.Direction.Y = Math.abs(this.Direction.Y);
            this.Speed = Math.random()*1.2 + .1

        }
        if (this.BoundaryBtm >= window.innerHeight) {
            this.Direction.Y = Math.abs(this.Direction.X) * -1;
            this.Speed = Math.random()*1.2 + .1

        }
    }

    moveCircle(): void {
        //calculate vector magnitude
        /** track boundaries, ensure items aren't stuck */
        this.bounceCircle()
        const magnitude: number = Math.sqrt(Math.pow(this.Direction.X, 2) + Math.pow(this.Direction.Y, 2));

        // create the "normalized" vector
        const normalizedVec: Pair = new Pair(this.Direction.X / magnitude, this.Direction.Y / magnitude);
        const displacement = [this.Speed * normalizedVec.X, this.Speed * normalizedVec.Y];
        const newPos = new Pair(this.position.X + displacement[0], this.position.Y + displacement[1]);
        this.setPos(newPos);
        this.calcHitboxBoundaries();
    }

    drawShape(fill: string="transparent", stroke: string="white") {
        const ctx = super.getContext();
        if (!ctx) return;
        // ctx.clearRect(0,0, ctx.canvas.width, ctx.canvas.height);
        const w = ctx.canvas.width;
        ctx.imageSmoothingEnabled = true;
        const pos = super.getPos();
        ctx.beginPath();
        ctx.arc(pos.X, pos.Y, this.radius, 0, 360)
        ctx.fillStyle = `rgba(0,0,0,0.5)`;
        ctx.lineWidth = 3;
        // hue limit (242, 277)
        // ctx.strokeStyle = `hsla(${400 - (220*lerp(pos.X, 0, w))}, 100%, ${44+ 34*lerp(pos.X, 0, w)}%)`;
        ctx.strokeStyle="white"
        ctx.fill();
        ctx.stroke();
    }

}


export default Circle;
