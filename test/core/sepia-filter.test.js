import toSepia from "../../src/core/sepia-filter.js";

describe('toSepia', () => {
    test('basic functionality test', () => {
        const inputArray = [243, 22, 108, 255, 173, 12, 0, 255]; // An array of pixel values representing an image

        const testArray = new Uint8ClampedArray(toSepia(inputArray));
        const resultArray = new Uint8ClampedArray([133, 118, 92, 255, 77, 69, 53, 255])

        expect(testArray).toStrictEqual(resultArray)
    });

    test('invariation of black color', () => {
        const inputArray = [0, 0, 0, 255, 0, 0, 0, 255]; // An array of pixel values representing an image
        
        expect(toSepia(inputArray)).toBe(inputArray)
    });

});