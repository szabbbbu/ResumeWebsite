import Shape from "./Shape";
import Pair from "../util/Pair";

class Circle extends Shape {

    public radius: number;
    protected BoundaryTop!: Pair;
    protected BoundaryBtm!: Pair;
    protected BoundaryRight!: Pair;
    protected BoundaryLeft!: Pair;

    constructor(x: number, y: number, radius: number, ctx?: CanvasRenderingContext2D) {
        super(x, y, ctx);
        this.radius = radius;
        this.calcHitboxBoundaries();
    }

    private calcHitboxBoundaries() {
        this.BoundaryTop = new Pair(this.position.X, this.position.Y - this.radius);
        this.BoundaryBtm = new Pair(this.position.X, this.position.Y + this.radius);
        this.BoundaryLeft = new Pair(this.position.X - this.radius, this.position.Y);
        this.BoundaryRight = new Pair(this.position.X + this.radius, this.position.Y);
    }

    drawShape(fill: string="transparent", stroke: string="black") {
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
