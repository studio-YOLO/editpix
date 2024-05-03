import utils from "../../src/utils.js"

describe('rgbToHex', () => {
    test('Converts RGB to hexadecimal color for valid inputs', () => {
        // Test valid RGB inputs
        expect(utils.rgbToHex(255, 0, 0)).toBe("#ff0000");
        expect(utils.rgbToHex(0, 255, 0)).toBe("#00ff00");
        expect(utils.rgbToHex(0, 0, 255)).toBe("#0000ff");
        // Add more test cases for valid inputs as needed
    });
});

describe('hexToRgb', () => {
    test('Converts hexadecimal color to RGB for valid inputs', () => {
        // Test valid hexadecimal color inputs
        expect(utils.hexToRgb('#FF0000')).toEqual({ r: 255, g: 0, b: 0 });
        expect(utils.hexToRgb('#00FF00')).toEqual({ r: 0, g: 255, b: 0 });
        expect(utils.hexToRgb('#0000FF')).toEqual({ r: 0, g: 0, b: 255 });
        // Add more test cases as needed
    });

    test('Throws error for invalid hexadecimal color inputs', () => {
        // Test invalid hexadecimal color inputs
        expect(() => utils.hexToRgb('#FF00')).toThrow(Error);
        expect(() => utils.hexToRgb('#00GG00')).toThrow(Error);
        expect(() => utils.hexToRgb('red')).toThrow(Error);
        // Add more test cases as needed
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

describe('rgbToHsl', () => {
    test('Converts RGB to HSL for valid inputs', () => {
        // Test valid RGB inputs
        expect(utils.rgbToHsl(255, 0, 0)).toEqual({ h: 0, s: 100, l: 50 });
        expect(utils.rgbToHsl(0, 255, 0)).toEqual({ h: 120, s: 100, l: 50 });
        expect(utils.rgbToHsl(0, 0, 255)).toEqual({ h: 240, s: 100, l: 50 });
        // Add more test cases as needed
    });

    test('Throws error for invalid RGB inputs', () => {
        // Test invalid RGB inputs
        expect(() => utils.rgbToHsl(-1, 0, 0)).toThrow(Error);
        expect(() => utils.rgbToHsl(256, 0, 0)).toThrow(Error);
        expect(() => utils.rgbToHsl(0, -1, 0)).toThrow(Error);
        expect(() => utils.rgbToHsl(0, 256, 0)).toThrow(Error);
        expect(() => utils.rgbToHsl(0, 0, -1)).toThrow(Error);
        expect(() => utils.rgbToHsl(0, 0, 256)).toThrow(Error);
        // Add more test cases as needed
    });
});

describe('hslToRgb', () => {
    test('Converts HSL to RGB for valid inputs', () => {
        // Test valid HSL inputs
        expect(utils.hslToRgb(0, 100, 50)).toEqual({ r: 255, g: 0, b: 0 });
        expect(utils.hslToRgb(120, 100, 50)).toEqual({ r: 0, g: 255, b: 0 });
        expect(utils.hslToRgb(240, 100, 50)).toEqual({ r: 0, g: 0, b: 255 });
        // Add more test cases as needed
    });

    test('Throws error for invalid HSL inputs', () => {
        // Test invalid HSL inputs
        expect(() => utils.hslToRgb(-1, 100, 50)).toThrow(Error);
        expect(() => utils.hslToRgb(361, 100, 50)).toThrow(Error);
        expect(() => utils.hslToRgb(0, -1, 50)).toThrow(Error);
        expect(() => utils.hslToRgb(0, 101, 50)).toThrow(Error);
        expect(() => utils.hslToRgb(0, 100, -1)).toThrow(Error);
        expect(() => utils.hslToRgb(0, 100, 101)).toThrow(Error);
        // Add more test cases as needed
    });
});