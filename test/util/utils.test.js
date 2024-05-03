import utils from "../../src/utils.js"

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