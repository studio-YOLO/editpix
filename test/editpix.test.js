import EditPix from "../src/editpix.js"

describe('EditPix convertToRgb method', () => {
    test('converts hex colors to RGB correctly for array input', () => {
        const editPix = new EditPix();
        const hexColors = ['#ff0000', '#00ff00', '#0000ff']; // Red, Green, Blue
        const expectedRgbColors = [
            [255, 0, 0],
            [0, 255, 0],
            [0, 0, 255]
        ];
        expect(editPix.convertToRgb(hexColors)).toEqual(expectedRgbColors);
    });

    test('converts hex colors to RGB correctly for single color input', () => {
        const editPix = new EditPix();
        const hexColor = '#ff0000'; // Red
        const expectedRgbColor = [[255, 0, 0]];
        expect(editPix.convertToRgb(hexColor)).toEqual(expectedRgbColor);
    });

    test('throws an error for invalid hex color input', () => {
        const editPix = new EditPix();
        const invalidHexColor = 'invalid_hex_color';
        expect(() => editPix.convertToRgb(invalidHexColor)).toThrow(Error);
    });
});

describe('EditPix convertToHex method', () => {
    test('converts RGB colors to hex correctly for array input', () => {
        const editPix = new EditPix();
        const rgbColors = [[255, 0, 0], [0, 255, 0], [0, 0, 255]]; // Red, Green, Blue
        const expectedHexColors = ['#ff0000', '#00ff00', '#0000ff'];
        expect(editPix.convertToHex(rgbColors)).toEqual(expectedHexColors);
    });

    test('converts RGB colors to hex correctly for single color input', () => {
        const editPix = new EditPix();
        const rgbColor = [255, 0, 0]; // Red
        const expectedHexColor = ['#ff0000'];
        expect(editPix.convertToHex(rgbColor)).toEqual(expectedHexColor);
    });
});