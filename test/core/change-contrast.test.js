import changeContrast from "../../src/core/change-contrast.js";

describe('changeContrast function', () => {
    test('does not change anything if factor is 0', () => {
        const pixelArray = [0, 0, 0, 11, 255, 255, 255, 23, 2, 128, 47, 71];    // RGBA values
        const expectedContrastArray = [0, 0, 0, 11, 255, 255, 255, 23, 2, 128, 47, 71];  // untouched vector
        expect(changeContrast(pixelArray, 0)).toEqual(expectedContrastArray);
    });
    test('rescales input vector correctly', () => {
        const pixelArray = [0, 0, 0, 11, 255, 255, 255, 23, 2, 128, 47, 71];    // RGBA values
        const expectedSetContrastArray = [2, 2, 2, 11, 253, 253, 253, 23, 2, 128, 10, 71];  // hand-computed rescaling
        expect(changeContrast(pixelArray, 10).map((value) => Math.round(value))) // round values
            .toEqual(expectedSetContrastArray);
    });
})