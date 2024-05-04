import changeShadows from "../../src/core/change-shadows.js"

describe('changeShadows', () => {
    test('should return a darkened array if factor is negative and area is a shadow', () => {
        const testColor1 = [13, 11, 4];
        const testColor2 = [13, 11, 4];
        changeShadows(testColor1, -10);
        expect(testColor1[0]).toBeLessThan(testColor2[0]);
        expect(testColor1[1]).toBeLessThan(testColor2[1]);
        expect(testColor1[2]).toBeLessThan(testColor2[2]);
    });
    test('should return an unchanged array if factor is 0', () => {
        const testColor1 = [234, 112, 8];
        const testColor2 = [234, 112, 8];
        changeShadows(testColor1, 0);
        expect(testColor1[0]).toEqual(testColor2[0]);
        expect(testColor1[1]).toEqual(testColor2[1]);
        expect(testColor1[2]).toEqual(testColor2[2]);
    });
    test('should only darken shadows (luma < 128)', () => {
        const testColor1 = [173, 114, 255];
        const testColor2 = [173, 114, 255];
        changeShadows(testColor1, -5);
        expect(testColor1[0]).toEqual(testColor2[0]);
        expect(testColor1[1]).toEqual(testColor2[1]);
        expect(testColor1[2]).toEqual(testColor2[2]);
    });
});