import Shape from "./Shape";

class Circle extends Shape {

    constructor(x: number, y: number, ctx?: CanvasRenderingContext2D) {
        super(x, y, ctx);
    }

    drawShape(radius: number, fill: string="transparent", stroke: string="black") {
        const ctx = super.getContext();
        if (ctx == null) return;
        // ctx.clearRect(0,0, ctx.canvas.width, ctx.canvas.height);
        ctx.imageSmoothingEnabled = true;
        const {x, y} = super.getPos();
        ctx.beginPath();
        ctx.arc(x, y, radius, 0, 360)
        ctx.fillStyle = fill;
        ctx.lineWidth= 2;
        ctx.strokeStyle = stroke;
        ctx.fill();
        ctx.stroke();
    }
}


export default Circle;
