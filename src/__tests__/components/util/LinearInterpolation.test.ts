import { lerp } from "@/components/util/LinearInterpolation";

describe("lerp testing", () => {
    it("should do", () => {
        const val = lerp(1, 245.77152147772983, 269.72769510951247);
         
        expect(val).toBe(0);
    });
});
