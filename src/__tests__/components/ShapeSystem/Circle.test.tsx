// import Circle from "../../../components/ShapeSystem/Circle";
// import Pair from "../../../components/util/Pair";

// class CircleTestable extends Circle {
//     getBoundaryTop() {
//         return this.BoundaryTop;
//     }
//     getBoundaryBtm() {
//         return this.BoundaryBtm; 
//     }
//     getBoundaryLeft() {
//         return this.BoundaryLeft;
//     }
//     getBoundaryRight() {
//         return this.BoundaryRight;
//     }
// }

// describe("Circle", () => {
//     let circle: CircleTestable;

//     beforeEach(() => {
//         const mockCanvasCtx: any = {
//             beginPath: jest.fn(),
//             arc: jest.fn(),
//             fill: jest.fn(),
//             stroke: jest.fn(),
//             lineWidth: 2,
//             canvas: {
//                 width: 100, // Example canvas width
//                 height: 100, // Example canvas height
//             },
//         }
//         circle = new CircleTestable(100, 100, 60, mockCanvasCtx);
//     });

//     it("should have a radius of 60, given 60 at creation", () => {
//         expect(circle.radius).toBe(60);
//     });

//     it("should calculate hitbox boundaries correctly", () => {
//         const top = circle.getBoundaryTop();
//         expect(top).toBe(circle.getPos().X);
//         expect(top).toBe(40); // 100 - 60
//         const btm = circle.getBoundaryBtm();
//         expect(btm).toBe(circle.getPos().X);
//         expect(btm).toBe(160);
//         const left = circle.getBoundaryLeft();
//         expect(left).toBe(40);
//         expect(left).toBe(100);
//         const right = circle.getBoundaryRight();
//         expect(right).toBe(160);
//     });

//     it("should update the inner circle position correctly", () => {
//         circle.setPos(new Pair(7,7));
//         const newPosition = circle.getPos();
//         expect(newPosition.X).toBe(7);
//         expect(newPosition.Y).toBe(7);
//     })

//     it("should update move circle function correctly", () => {
//         // const newPostion: Pair = circle.moveCircle(new Pair(0,-4), 2);
        
//     })
// })


