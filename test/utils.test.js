import utils from "../src/utils.js"

describe('rgbToHex function', () => {
    test('converts RGB colors to hexadecimal correctly', () => {
        const rgbColors = [
            [255, 0, 0],   // Red
            [0, 255, 0],   // Green
            [0, 0, 255]    // Blue
        ];
        const expectedHexColors = ['#ff0000', '#00ff00', '#0000ff'];
        expect(utils.rgbToHex(rgbColors)).toEqual(expectedHexColors);
    });

    test('handles empty input array', () => {
        const rgbColors = [];
        expect(utils.rgbToHex(rgbColors)).toEqual([]);
    });

    test('converts black color correctly', () => {
        const rgbColors = [[0, 0, 0]];
        const expectedHexColors = ['#000000'];
        expect(utils.rgbToHex(rgbColors)).toEqual(expectedHexColors);
    });

    test('converts white color correctly', () => {
        const rgbColors = [[255, 255, 255]];
        const expectedHexColors = ['#ffffff'];
        expect(utils.rgbToHex(rgbColors)).toEqual(expectedHexColors);
    });
});

describe('hexToRgb function', () => {
    test('converts hexadecimal colors to RGB correctly', () => {
        const hexColors = ['#ff0000', '#00ff00', '#0000ff'];
        const expectedRgbColors = [
            [255, 0, 0],   // Red
            [0, 255, 0],   // Green
            [0, 0, 255]    // Blue
        ];
        expect(utils.hexToRgb(hexColors)).toEqual(expectedRgbColors);
    });

    test('handles empty input array', () => {
        const hexColors = [];
        expect(utils.hexToRgb(hexColors)).toEqual([]);
    });

    test('converts black color correctly', () => {
        const hexColors = ['#000000'];
        const expectedRgbColors = [[0, 0, 0]];
        expect(utils.hexToRgb(hexColors)).toEqual(expectedRgbColors);
    });

    test('converts white color correctly', () => {
        const hexColors = ['#ffffff'];
        const expectedRgbColors = [[255, 255, 255]];
        expect(utils.hexToRgb(hexColors)).toEqual(expectedRgbColors);
    });

    test('throws an error for invalid hex input', () => {
        const hexColors = ['#ff00', '#00ff00ff']; // Invalid hex colors
        expect(() => utils.hexToRgb(hexColors)).toThrow(Error);
    });

    test('converts short hex colors to RGB correctly', () => {
        const hexColors = ['#f00', '#0f0', '#00f']; // Short hex colors
        const expectedRgbColors = [
            [255, 0, 0],   // Red
            [0, 255, 0],   // Green
            [0, 0, 255]    // Blue
        ];
        expect(utils.hexToRgb(hexColors)).toEqual(expectedRgbColors);
    });
});

describe('removeAlpha function', () => {
    test('removes alpha channel from pixel array', () => {
        const pixelArray = [255, 0, 0, 255, 0, 255, 0, 128]; // RGBA values
        const expectedResult = [
            [255, 0, 0],   // Red
            [0, 255, 0]    // Green
        ];
        expect(utils.removeAlpha(pixelArray)).toEqual(expectedResult);
    });

    test('handles empty input array', () => {
        const pixelArray = [];
        expect(utils.removeAlpha(pixelArray)).toEqual([]);
    });
});

describe('validate function', () => {
    test('throws error for invalid quality parameter', () => {
        expect(() => utils.validate(0, 5)).toThrow(Error)
        expect(() => utils.validate(11, 5)).toThrow(Error)
    });

    test('throws error for invalid color number', () => {
        expect(() => utils.validate(5, 0)).toThrow(Error)
        expect(() => utils.validate(5, 16)).toThrow(Error)
    });

    test('does not throw error for valid parameters', () => {
        expect(() => utils.validate(5, 5)).not.toThrowError();
        expect(() => utils.validate(1, 1)).not.toThrowError();
        expect(() => utils.validate(10, 15)).not.toThrowError();
    });
});