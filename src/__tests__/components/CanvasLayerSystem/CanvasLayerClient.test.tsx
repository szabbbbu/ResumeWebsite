import React from "react";
import CanvasLayerClient from "../../../components/CanvasLayerSystem/CanvasLayerClient";
import { render, screen } from "@testing-library/react";
import Circle from "@/components/ShapeSystem/Circle";

describe('CanvasLayerClient component', () => {
    beforeAll(() => {
        // Mock the necessary implementations or global objects (e.g., window.innerWidth) used in your component
        // For example:
        Object.defineProperty(window, 'innerWidth', { value: 800 });
        Object.defineProperty(window, 'innerHeight', { value: 600 });
      });
    it('accesses circles drawn on the canvas', () => {
      // Render the CanvasLayerClient component
      const { container } = render(<CanvasLayerClient />);
  
      // Access the getCircles function exposed globally
      const getCircles = (window as any).getCircles as () => Circle[];
  
      // Retrieve circles
      const circles = getCircles();
  
      // Perform assertions based on the circles drawn
      expect(circles).toHaveLength(5); // Assuming you are creating 5 circles
      // Add more assertions based on the properties or positions of the circles
    });
  });
