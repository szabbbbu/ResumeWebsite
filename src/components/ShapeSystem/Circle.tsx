import Shape from "./Shape";
import Pair from "../util/Pair";

class Circle extends Shape {

    public radius: number;
    protected BoundaryTop!: Pair; //! signifies it will be instantiated outside constuctor
    protected BoundaryBtm!: Pair;
    protected BoundaryRight!: Pair;
    protected BoundaryLeft!: Pair;
    protected Direction: Pair;
    protected Speed: number;

    constructor(x: number, y: number, radius: number, ctx?: CanvasRenderingContext2D) {
        super(x, y, ctx);
        this.radius = radius;
        this.calcHitboxBoundaries();
        const randomVx = Math.floor((Math.random() * 80) - 40);
        const randomVy = Math.floor((Math.random() * 80) - 40);
        this.Direction = new Pair(randomVx, randomVy);
        this.Speed = 2
    }

    calcHitboxBoundaries() {
        this.BoundaryTop = new Pair(this.position.X, this.position.Y - this.radius);
        this.BoundaryBtm = new Pair(this.position.X, this.position.Y + this.radius);
        this.BoundaryLeft = new Pair(this.position.X - this.radius, this.position.Y);
        this.BoundaryRight = new Pair(this.position.X + this.radius, this.position.Y);
    }

    moveCircle(): void {
        //calculate vector magnitude
        /** track boundaries */
        if (this.BoundaryLeft.X <= 0 || this.BoundaryRight.X >= window.innerWidth) {
            this.Direction.X *= -1;
        }
        if (this.BoundaryTop.Y <= 0 || this.BoundaryBtm.Y >= window.innerHeight) {
            this.Direction.Y *= -1;
        }
        const magnitude: number = Math.sqrt(Math.pow(this.Direction.X, 2) + Math.pow(this.Direction.Y, 2));

        // console.log("magnitude", magnitude)
        // create the "normalized" vector
        const normalizedVec: Pair = new Pair(this.Direction.X / magnitude, this.Direction.Y / magnitude);
        // console.log("normalized vec", normalizedVec.X, normalizedVec.Y);
        const displacement = [this.Speed * normalizedVec.X, this.Speed * normalizedVec.Y];
        // console.log("displacement::: ", displacement)
        // console.log("Current position: ", this.position.X, this.position.Y);
        const newPos = new Pair(this.position.X + displacement[0], this.position.Y + displacement[1]);
        // console.log("newPos", newPos.X, newPos.Y);
        // this.clearShape();
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

    // clearShape(): void {
    //     if (this.CanvasContext) {
    //         this.CanvasContext.clearRect(this.position.X - this.radius, this.position.Y - this.radius, this.position.X + this.radius, this.position.Y + (this.radius))
    //     }
    // }
}


export default Circle;
