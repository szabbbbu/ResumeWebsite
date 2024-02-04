import { lerp } from "@/components/util/LinearInterpolation";

describe("lerp testing", () => {
    it("should do", () => {
        const val = lerp(50, 0, 100);
         
        expect(val).toBe(0.5);
    });
});
