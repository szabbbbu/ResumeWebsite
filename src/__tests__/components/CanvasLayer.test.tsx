import { getByTestId, render, screen } from "@testing-library/react";
import React from "react";
import CanvasLayer from "../../components/CanvasLayer";
import '@testing-library/jest-dom/';

test("the canvas layer component", () => {
    const {getByTestId} = render(<CanvasLayer />);
    const c = screen.getByTestId("myCanvas");
    expect(c).toBeInTheDocument();
    // const canvasElem = getByTestId("myCanvas");
    // expect(canvasElem).toBeInTheDocument();
});