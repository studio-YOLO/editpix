import changeHighlights from "../../src/core/change-highlights.js";

describe('changeHighlights function', () => {
    it('should brighten highlight areas when factor > 1', () => {
      const pixelArray = [200, 150, 100, 255, 100, 50, 20, 255]; // Example pixel array
      const factor = 2; // Brightening factor
  
      const outputArray = new Uint8ClampedArray(changeHighlights(pixelArray, factor));
  
      // Check if the highlight areas are brightened
      expect(outputArray).toEqual(new Uint8ClampedArray([202, 152, 102, 255, 100, 50, 20, 255]));
    });
  
    it('should darken highlight areas when factor < 1', () => {
      const pixelArray = [200, 150, 100, 255, 100, 50, 20, 255]; // Example pixel array
      const factor = 0.5; // Darkening factor
  
      const outputArray = new Uint8ClampedArray(changeHighlights(pixelArray, factor));
  
      // Check if the highlight areas are darkened
      expect(outputArray).toEqual(new Uint8ClampedArray([200, 150, 100, 255, 100, 50, 20, 255]));
    });
  
    it('should not modify non-highlight areas', () => {
      const pixelArray = [50, 50, 50, 255, 201, 201, 201, 255]; // Example pixel array
      const factor = 2; // Brightening factor
  
      const outputArray = new Uint8ClampedArray(changeHighlights(pixelArray, factor));
  
      // Check if non-highlight areas remain unchanged
      expect(outputArray).toEqual(new Uint8ClampedArray([50, 50, 50, 255, 202, 202, 202, 255]));
    });
  });