import CanvasLayer from "../../components/CanvasLayer";
import {render, screen} from "@testing-library/react";

describe("UI functionality of CanvasLayer element", () => {
    test("should produce a canvas element streched to edges of the window",
        () => {
            render(<CanvasLayer />);
        });
} )