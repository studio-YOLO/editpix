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
        const pixelArray = [255, 0, 0, 255, 0, 255, 0, 128, 0, 255, 0, 125]; // RGBA values
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

describe('hslToRgb', () => {
    test('Correctly converts HSL to RGB', () => {
        expect(utils.hslToRgb(0, 100, 50)).toEqual([255, 0, 0]);
        expect(utils.hslToRgb(120, 100, 50)).toEqual([0, 255, 0]);
        expect(utils.hslToRgb(240, 100, 50)).toEqual([0, 0, 255]);
    });

    test('Correctly handles HSL with saturation or lightness at the limit', () => {
        expect(utils.hslToRgb(0, 0, 0)).toEqual([0, 0, 0]);
        expect(utils.hslToRgb(0, 100, 0)).toEqual([0, 0, 0]);
        expect(utils.hslToRgb(0, 0, 100)).toEqual([255, 255, 255]);
        expect(utils.hslToRgb(0, 100, 100)).toEqual([255, 255, 255]);
    });

    test('Throws an error for invalid HSL values', () => {
        expect(() => utils.hslToRgb(-10, 100, 50)).toThrow(Error);
        expect(() => utils.hslToRgb(361, 100, 50)).toThrow(Error);
        expect(() => utils.hslToRgb(0, -10, 50)).toThrow(Error);
        expect(() => utils.hslToRgb(0, 100, 101)).toThrow(Error);
    });
});

describe('rgbToHsl', () => {
    test('Correctly converts RGB to HSL', () => {
        expect(utils.rgbToHsl(255, 0, 0)).toEqual([0, 100, 50]);
        expect(utils.rgbToHsl(0, 255, 0)).toEqual([120, 100, 50]);
        expect(utils.rgbToHsl(0, 0, 255)).toEqual([240, 100, 50]);
        expect(utils.rgbToHsl(255, 255, 255)).toEqual([0, 0, 100]);
        expect(utils.rgbToHsl(128, 128, 128)).toEqual([0, 0, 50]);
    });

    test('Throws an error for invalid RGB values', () => {
        expect(() => utils.rgbToHsl(-10, 0, 0)).toThrow(Error);
        expect(() => utils.rgbToHsl(256, 0, 0)).toThrow(Error);
        expect(() => utils.rgbToHsl(0, 300, 0)).toThrow(Error);
        expect(() => utils.rgbToHsl(0, 0, -20)).toThrow(Error);
    });
});