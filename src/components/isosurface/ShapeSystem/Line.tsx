import Pair from "../../util/Pair";
import Shape from "./Shape";


class Line extends Shape {
    private Finish: Pair;
    private Width: number;
    constructor(x: number, y: number, finish: Pair, width: number, ctx: CanvasRenderingContext2D) {
        super(x, y, ctx);

        this.Finish = finish;
        this.Width = width;
    }

    drawShape(stroke:string="rgba(255,255,255,0.8)"): void {
        const ctx = super.getContext();
        if (!ctx) return;
        // ctx.lineCap = "round";
        ctx.beginPath();
        
        ctx.strokeStyle = stroke;
        ctx.lineWidth = this.Width;
        ctx.moveTo(this.position.X, this.position.Y);
        ctx.lineTo(this.Finish.X, this.Finish.Y);
        ctx.stroke();
    }
}

export default Line;
