import { getByTestId, render, screen } from "@testing-library/react";
import React from "react";
import CanvasLayer from "../../components/CanvasLayerSystem/CanvasLayer";
import '@testing-library/jest-dom/';

test("The width of the canvas should be the size of the browser window", () => {
    const screen = render(<CanvasLayer />);
    const c = screen.getByTestId("myCanvas");
    expect(c).toBeInTheDocument();
    expect(c.clientWidth).toBe(window.innerWidth)
    // const canvasElem = getByTestId("myCanvas");
    // expect(canvasElem).toBeInTheDocument();
});