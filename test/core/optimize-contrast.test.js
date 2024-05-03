import optimizeContrast from "../../src/core/optimize-contrast.js";

describe('optimizeContrast function', () => {
    test('rescales input vector correctly', () => {
        const pixelArray = [204, 33, 11, 33, 132, 4, 108, 13, 167, 50, 72, 141];    // RGBA values
        const expectedOptimizedContrastArray = [255, 161, 0, 33, 0, 0, 255, 13, 124, 255, 160, 141];    // hand-computed rescaling
        expect(optimizeContrast(pixelArray)).toEqual(expectedOptimizedContrastArray);
    });

    test('skips rescaling if array is already optimized', () => {
        const pixelArray = [0, 0, 0, 0, 132, 4, 108, 0, 255, 255, 255, 0];  // RGBA values
        const expectedOptimizedContrastArray = [0, 0, 0, 0, 132, 4, 108, 0, 255, 255, 255, 0];  // untouched vector
        expect(optimizeContrast(pixelArray)).toEqual(expectedOptimizedContrastArray);
    });
});