import Circle from "@/components/isosurface/ShapeSystem/Circle"
import Pair from "@/components/util/Pair";

class CircleTestable extends Circle {
    getDirectionVec(): Pair {
        return this.Direction;
    }
}

describe("Circle", () => {
    let circle: CircleTestable;

    beforeEach(() => {
        const mockCanvasCtx: any = {
            beginPath: jest.fn(),
            arc: jest.fn(),
            fill: jest.fn(),
            stroke: jest.fn(),
            lineWidth: 2,
            canvas: {
                width: 100, // Example canvas width
                height: 100, // Example canvas height
            },
        }
        circle = new CircleTestable(100, 100, 60, mockCanvasCtx);
    });

    it("should have a radius of 60, given 60 at creation", () => {
        expect(circle.radius).toBe(60);
    });

    it("should update the inner circle position correctly", () => {
        circle.setPos(new Pair(7,7));
        const newPosition = circle.getPos();
        expect(newPosition.X).toBe(7);
        expect(newPosition.Y).toBe(7);
    })

    it("should update move circle function correctly", () => {
        const dx = circle.getDirectionVec();
        // const expectedNewPos = 
        // const newPostion: Pair = circle.moveCircle();
        
    })
})


