import { hexToRgb, rgbToHex, rgbToHsl, hslToRgb } from "../../src/core/colorspace-conversion.js"

describe('rgbToHex', () => {
    test('Converts RGB to hexadecimal color for valid inputs', () => {
        // Test valid RGB inputs
        expect(rgbToHex(255, 0, 0)).toBe("#ff0000");
        expect(rgbToHex(0, 255, 0)).toBe("#00ff00");
        expect(rgbToHex(0, 0, 255)).toBe("#0000ff");
        // Add more test cases for valid inputs as needed
    });
});

describe('hexToRgb', () => {
    test('Converts hexadecimal color to RGB for valid inputs', () => {
        // Test valid hexadecimal color inputs
        expect(hexToRgb('#FF0000')).toEqual({ r: 255, g: 0, b: 0 });
        expect(hexToRgb('#00FF00')).toEqual({ r: 0, g: 255, b: 0 });
        expect(hexToRgb('#0000FF')).toEqual({ r: 0, g: 0, b: 255 });
        // Add more test cases as needed
    });

    test('Throws error for invalid hexadecimal color inputs', () => {
        // Test invalid hexadecimal color inputs
        expect(() => hexToRgb('#FF00')).toThrow(Error);
        expect(() => hexToRgb('#00GG00')).toThrow(Error);
        expect(() => hexToRgb('red')).toThrow(Error);
        // Add more test cases as needed
    });
});

describe('rgbToHsl', () => {
    test('Converts RGB to HSL for valid inputs', () => {
        // Test valid RGB inputs
        expect(rgbToHsl(255, 0, 0)).toEqual({ h: 0, s: 100, l: 50 });
        expect(rgbToHsl(0, 255, 0)).toEqual({ h: 120, s: 100, l: 50 });
        expect(rgbToHsl(0, 0, 255)).toEqual({ h: 240, s: 100, l: 50 });
        // Add more test cases as needed
    });

    test('Throws error for invalid RGB inputs', () => {
        // Test invalid RGB inputs
        expect(() => rgbToHsl(-1, 0, 0)).toThrow(Error);
        expect(() => rgbToHsl(256, 0, 0)).toThrow(Error);
        expect(() => rgbToHsl(0, -1, 0)).toThrow(Error);
        expect(() => rgbToHsl(0, 256, 0)).toThrow(Error);
        expect(() => rgbToHsl(0, 0, -1)).toThrow(Error);
        expect(() => rgbToHsl(0, 0, 256)).toThrow(Error);
        // Add more test cases as needed
    });
});

describe('hslToRgb', () => {
    test('Converts HSL to RGB for valid inputs', () => {
        // Test valid HSL inputs
        expect(hslToRgb(0, 100, 50)).toEqual({ r: 255, g: 0, b: 0 });
        expect(hslToRgb(120, 100, 50)).toEqual({ r: 0, g: 255, b: 0 });
        expect(hslToRgb(240, 100, 50)).toEqual({ r: 0, g: 0, b: 255 });
        // Add more test cases as needed
    });

    test('Throws error for invalid HSL inputs', () => {
        // Test invalid HSL inputs
        expect(() => hslToRgb(-1, 100, 50)).toThrow(Error);
        expect(() => hslToRgb(361, 100, 50)).toThrow(Error);
        expect(() => hslToRgb(0, -1, 50)).toThrow(Error);
        expect(() => hslToRgb(0, 101, 50)).toThrow(Error);
        expect(() => hslToRgb(0, 100, -1)).toThrow(Error);
        expect(() => hslToRgb(0, 100, 101)).toThrow(Error);
        // Add more test cases as needed
    });
});