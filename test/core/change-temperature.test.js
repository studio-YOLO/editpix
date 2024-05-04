import changeTemperature from "../../src/core/change-temperature.js";

describe('changeTemperature', () => {
    test('should adjust temperature for cool colors (factor < 0)', () => {
        const pixelArray = [100, 50, 150, 255, 200, 100, 50, 255]; // Example pixel array
        const factor = -50; // Factor for cool colors
        const expectedArray = [50, 50, 200, 255, 150, 100, 100, 255]; // Expected result after temperature adjustment

        const result = changeTemperature(pixelArray, factor);

        expect(result).toEqual(expectedArray);
    });

    test('should adjust temperature for warm colors (factor > 0)', () => {
        const pixelArray = [100, 50, 150, 255, 200, 100, 50, 255]; // Example pixel array
        const factor = 50; // Factor for warm colors
        const expectedArray = [150, 50, 100, 255, 250, 100, 0, 255]; // Expected result after temperature adjustment

        const result = changeTemperature(pixelArray, factor);

        expect(result).toEqual(expectedArray);
    });

    test('should not adjust temperature if factor is 0', () => {
        const pixelArray = [100, 50, 150, 255, 200, 100, 50, 255]; // Example pixel array
        const factor = 0; // Factor is 0
        const expectedArray = [...pixelArray]; // Should remain unchanged

        const result = changeTemperature(pixelArray, factor);

        expect(result).toEqual(expectedArray);
    });
});