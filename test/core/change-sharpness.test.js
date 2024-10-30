import changeSharpness from "../../src/core/change-sharpness.js"

describe('changeSharpness', () => {
    test('basic functionality test', () => {
        const inputArray = [243, 22, 108, 255, 173, 12, 0, 255]; // An array of pixel values representing an image
        const testArray = changeSharpness(inputArray, 2, 1, 32);
    
        // Verify that the sharpened image is processed correctly
        expect(testArray).toBe(inputArray)

    });

    test('handle negative factor correctly', () => {
        const inputArray = [243, 22, 108, 255, 173, 12, 0, 255]; // An array of pixel values representing an image
        const testArray = changeSharpness(inputArray, 2, 1, -40);

        // Verify that the function correctly handles negative sharpening factor
        expect(testArray).toBe(inputArray)
    });

});