import changeOpacity from "../../src/core/change-opacity.js";

describe('changeOpacity function', () => {
    test('should correctly change the opacity of pixel array', () => {
        // Example pixel array
        const pixelArray = [100, 50, 150, 255, 200, 100, 50, 255];
        // Expected opacity value
        const alphaValue = 150;
        // Expected array after opacity modification
        const expectedArray = [100, 50, 150, alphaValue, 200, 100, 50, alphaValue];

        // Execute the changeOpacity function
        const modifiedArray = changeOpacity(pixelArray, alphaValue);

        // Check that the array has correctly changed opacity
        expect(modifiedArray).toEqual(expectedArray);
    });
});