import EditPix from "../src/editpix.js"

describe('rgbToHex', () => {
    test('Converts RGB to hexadecimal color for valid inputs', () => {
        const editPix = new EditPix();
        expect(editPix.rgbToHex(255, 0, 0)).toBe("#ff0000");
        expect(editPix.rgbToHex(0, 255, 0)).toBe("#00ff00");
        expect(editPix.rgbToHex(0, 0, 255)).toBe("#0000ff");
        // Add more test cases for valid inputs as needed
    });

    test('Throws error for invalid RGB inputs', () => {
        const editPix = new EditPix();
        // Test invalid RGB inputs
        expect(() => editPix.rgbToHex(-1, 0, 0)).toThrow(Error);
        expect(() => editPix.rgbToHex(256, 0, 0)).toThrow(Error);
        expect(() => editPix.rgbToHex(0, -1, 0)).toThrow(Error);
        expect(() => editPix.rgbToHex(0, 256, 0)).toThrow(Error);
        expect(() => editPix.rgbToHex(0, 0, -1)).toThrow(Error);
        expect(() => editPix.rgbToHex(0, 0, 256)).toThrow(Error);
        // Add more test cases for invalid inputs as needed
    });
});

describe('EditPix.hexToRgb', () => {
    test('Converts hexadecimal color to RGB', () => {
        const editPix = new EditPix();
        // Test valid hexadecimal color inputs
        expect(editPix.hexToRgb('#ff0000')).toEqual({ r: 255, g: 0, b: 0 });
        expect(editPix.hexToRgb('#00ff00')).toEqual({ r: 0, g: 255, b: 0 });
        expect(editPix.hexToRgb('#0000ff')).toEqual({ r: 0, g: 0, b: 255 });

        // Test invalid hexadecimal color inputs
        expect(() => editPix.hexToRgb('#FF00')).toThrow("Invalid hex color: #FF00");
        expect(() => editPix.hexToRgb('#00GG00')).toThrow("Invalid hex color: #00GG00");
        // Add more test cases for invalid inputs as needed
    });
});


describe('EditPix changeTint method', () => {
    test('should reject lower out-of-range factors', () => {
        const editPix = new EditPix();
        expect(() => editPix.changeTint([0, 234, 87], 150)).toThrow(Error);
    });
    test('should reject upper out-of-range factors', () => {
        const editPix = new EditPix();
        expect(() => editPix.changeTint([0, 234, 87], -150)).toThrow(Error);
    });
});

describe('EditPix changeShadows method', () => {
    test('should reject lower out-of-range factors', () => {
        const editPix = new EditPix();
        expect(() => editPix.changeShadows([0, 234, 87], 150)).toThrow(Error);
    });
    test('should reject upper out-of-range factors', () => {
        const editPix = new EditPix();
        expect(() => editPix.changeShadow([0, 234, 87], -123)).toThrow(Error);
    });
});

describe('EditPix changeExposure method', () => {
    test('should reject lower out-of-range factors', () => {
        const editPix = new EditPix();
        expect(() => editPix.changeExposure([0, 234, 87], 150)).toThrow(Error);
    });
    test('should reject upper out-of-range factors', () => {
        const editPix = new EditPix();
        expect(() => editPix.changeExposure([0, 234, 87], -123)).toThrow(Error);
    });
});

describe('EditPix changeContrast method', () => {
    test('should reject lower out-of-range factors', () => {
        const editPix = new EditPix();
        expect(() => editPix.changeContrast([0, 234, 87], 150)).toThrow(Error);
    });
    test('should reject upper out-of-range factors', () => {
        const editPix = new EditPix();
        expect(() => editPix.changeContrast([0, 234, 87], -123)).toThrow(Error);
    });
});

describe('EditPix changeSaturation method', () => {
    test('should reject lower out-of-range factors', () => {
        const editPix = new EditPix();
        expect(() => editPix.changeSaturation([0, 234, 87], 150)).toThrow(Error);
    });
    test('should reject upper out-of-range factors', () => {
        const editPix = new EditPix();
        expect(() => editPix.changeSaturation([0, 234, 87], -123)).toThrow(Error);
    });
});

describe('EditPix changeBrightness method', () => {
    test('should reject lower out-of-range factors', () => {
        const editPix = new EditPix();
        expect(() => editPix.changeBrightness([0, 234, 87], 150)).toThrow(Error);
    });
    test('should reject upper out-of-range factors', () => {
        const editPix = new EditPix();
        expect(() => editPix.changeBrightness([0, 234, 87], -123)).toThrow(Error);
    });
});

describe('EditPix changeHighlights method', () => {
    test('should reject lower out-of-range factors', () => {
        const editPix = new EditPix();
        expect(() => editPix.changeHighlights([0, 234, 87], -123)).toThrow(Error);
    });
    test('should reject upper out-of-range factors', () => {
        const editPix = new EditPix();
        expect(() => editPix.changeHighlights([0, 234, 87], -123)).toThrow(Error);
    });
});

describe('EditPix changeSharpness method', () => {
    test('should reject lower out-of-range factors', () => {
        const editPix = new EditPix();
        expect(() => editPix.changeSharpness([0, 234, 87], 150)).toThrow(Error);
    });
    test('should reject upper out-of-range factors', () => {
        const editPix = new EditPix();
        expect(() => editPix.changeSharpness([0, 234, 87], -123)).toThrow(Error);
    });
});