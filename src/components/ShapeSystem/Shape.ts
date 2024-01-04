import Pair from "../util/Pair"

interface I_Shape {
    drawShape: (...args: any[]) => void;
    clearShape: () => void;
    getContext: () => CanvasRenderingContext2D | null;
    getPos: () => Pair;
}

abstract class Shape implements I_Shape {
    protected position: Pair;
    protected CanvasContext: CanvasRenderingContext2D | null;

    constructor(xPos: number, yPos: number, ctx: CanvasRenderingContext2D | null) {
        this.position = new Pair(xPos, yPos);
        this.CanvasContext = ctx;
    }

    abstract drawShape(...args: any[]): void;
    // abstract moveShape(dx: number, dy: number);

    getPos(): Pair {
        return this.position;
    }

    setPos(newPos: Pair): void {
        this.position = newPos;
    }

    getContext(): CanvasRenderingContext2D | null {
        if (this.CanvasContext) return this.CanvasContext;
        else return null;
    }

    clearShape(): void {
        if (this.CanvasContext) {
            this.CanvasContext.clearRect(0,0, this.CanvasContext.canvas.width, this.CanvasContext.canvas.height)
        }
    }
    
}
export default Shape;
