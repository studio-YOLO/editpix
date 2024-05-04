import higherColorContrast from "../../src/core/higher-contrast.js";

describe('higherColorContrast', () => {
    test('should return color with higher contrast for dark input color', () => {
        const darkColor = [10, 20, 30];
        const expectedResult = [255, 255, 255]; // Expected result for dark color

        const result = higherColorContrast(darkColor);

        expect(result).toEqual(expectedResult);
    });

    test('should return color with higher contrast for light input color', () => {
        const lightColor = [200, 210, 220];
        const expectedResult = [0, 0, 0]; // Expected result for light color

        const result = higherColorContrast(lightColor);

        expect(result).toEqual(expectedResult);
    });

    test('should return color with higher contrast for medium input color', () => {
        const mediumColor = [120, 130, 140];
        const expectedResult = [0, 0, 0]; // Expected result for medium color

        const result = higherColorContrast(mediumColor);

        expect(result).toEqual(expectedResult);
    });
});