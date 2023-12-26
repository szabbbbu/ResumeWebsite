import Shape from "./Shape";


class Line extends Shape {
    constructor(x: number, y: number, ctx?: CanvasRenderingContext2D) {
        super(x, y, ctx);
    }

    drawShape(from: {x: number, y: number}, to: {x: number, y: number}, stroke:string="black"): void {
        const ctx = super.getContext();
        if (!ctx) return;
        ctx.beginPath();
        ctx.strokeStyle = stroke;
        ctx.moveTo(from.x, from.y);
        ctx.lineTo(to.x, to.y);
        ctx.stroke();
    }
}

export default Line;
