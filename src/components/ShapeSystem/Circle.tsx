import Shape from "./Shape";
import Pair from "../util/Pair";

class Circle extends Shape {

    public radius: number;
    protected BoundaryTop!: number; //! signifies it will be instantiated outside constuctor
    protected BoundaryBtm!: number;
    protected BoundaryRight!: number;
    protected BoundaryLeft!: number;
    protected Direction: Pair; //the vector dictating direction of circle movement
    protected Speed: number;

    constructor(x: number, y: number, radius: number, ctx: CanvasRenderingContext2D | null) {
        super(x, y, ctx);
        this.radius = radius;
        this.calcHitboxBoundaries();
        const randomVx = Math.floor((Math.random() * 80) - 40);
        const randomVy = Math.floor((Math.random() * 80) - 40);
        this.Direction = new Pair(randomVx, randomVy);
        this.Speed = 2
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
        ctx.fillStyle = fill;
        ctx.lineWidth = 2;
        ctx.strokeStyle = stroke;
        ctx.fill();
        ctx.stroke();
    }

}


export default Circle;
