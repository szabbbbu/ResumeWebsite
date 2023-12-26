
type Props = {

}

interface I_Shape {
    drawShape: (...args: any[]) => void;
    clearShape: () => void;
    getContext: () => CanvasRenderingContext2D | null;
    getPos: () => {x: number, y: number}
}

abstract class Shape implements I_Shape {
    private X: number;
    private Y: number;
    protected CanvasContext?: CanvasRenderingContext2D;

    constructor(xPos: number, yPos: number, ctx?: CanvasRenderingContext2D) {
        this.X = xPos;
        this.Y = yPos;
        this.CanvasContext = ctx;
    }

    abstract drawShape(...args: any[]): void;

    getPos(): {x: number, y: number} {
        return {x: this.X, y: this.Y};
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
