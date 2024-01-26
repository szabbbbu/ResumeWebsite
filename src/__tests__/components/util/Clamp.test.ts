import { clamp } from "@/components/util/ClampFunctions";

describe("Clamp tests", () => {
    it("should return 0.5", () => {
        const v = 0.5001
        const res = clamp(v, 0, 0.5);
        expect(res).toBe(0.5);
    })
});
