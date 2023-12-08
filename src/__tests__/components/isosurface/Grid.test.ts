import CanvasGrid from "../../../components/isosurface/Grid";


test("3 rows and 3 cols results in 16 points", () => {
    const grid = new CanvasGrid(3, 1920, 1080);
    // const len = grid.getGrid().reduce((acc, curr) => acc + curr.length, 0);
    const len = grid.getGrid().length
    expect(len).toBe(2) // (rows+1) * (cols+1)
});

test("creating less than two rows and/or columns results in an error", () => {
    expect(() => {
       new CanvasGrid(0, 1920, 1080);
    }).toThrow()

    expect(() => {
        new CanvasGrid(1, 1920, 1080);
    }).toThrow();
})

