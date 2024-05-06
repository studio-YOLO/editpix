import higherColorContrast from "../../src/core/higher-contrast.js";

describe('higherColorContrast', () => {
    test('should return color with higher contrast for dark input color', () => {
        const darkColor = [10, 20, 30];
        const expectedResult = { r: 255, g: 255, b: 255 }; // Expected result for dark color

        const result = higherColorContrast(darkColor[0], darkColor[1], darkColor[2]);

        expect(result).toEqual(expectedResult);
    });

    test('should return color with higher contrast for light input color', () => {
        const lightColor = [200, 210, 220];
        const expectedResult = { r: 0, g: 0, b: 0 }; // Expected result for light color

        const result = higherColorContrast(lightColor[0], lightColor[1], lightColor[2]);

        expect(result).toEqual(expectedResult);
    });

    test('should return color with higher contrast for medium input color', () => {
        const mediumColor = [120, 130, 140];
        const expectedResult = { r: 0, g: 0, b: 0 }; // Expected result for medium color

        const result = higherColorContrast(mediumColor[0], mediumColor[1], mediumColor[2]);

        expect(result).toEqual(expectedResult);
    });
});