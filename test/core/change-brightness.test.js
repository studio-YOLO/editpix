import changeBrightness from "../../src/core/change-brightness.js";

describe('changeBrightness', () => {
    test('should not change anything if factor is 0', () => {
        const testColor1 = [173, 114, 255];
        const testColor2 = [173, 114, 255];
        changeBrightness(testColor1, 0);
        expect(testColor1[0]).toEqual(testColor2[0]);
        expect(testColor1[1]).toEqual(testColor2[1]);
        expect(testColor1[2]).toEqual(testColor2[2]);
    });
    test('should change something if factor is not 0', () => {
        const testColor1 = [173, 114, 234];
        const testColor2 = [173, 114, 234];
        changeBrightness(testColor1, 50);
        expect(testColor1[0]).not.toEqual(testColor2[0]);
        expect(testColor1[1]).not.toEqual(testColor2[1]);
        expect(testColor1[2]).not.toEqual(testColor2[2]);
    });
    test('should clip to 0 at the bottom', () => {
        const testColor1 = [11, 13, 7];
        const testColor2 = [0, 0, 0];
        changeBrightness(testColor1, -80);
        expect(testColor1[0]).toEqual(testColor2[0]);
        expect(testColor1[1]).toEqual(testColor2[1]);
        expect(testColor1[2]).toEqual(testColor2[2]);
    });
    test('should clip to 255 at the top', () => {
        const testColor1 = [243, 210, 251];
        const testColor2 = [255, 255, 255];
        changeBrightness(testColor1, 100);
        expect(testColor1[0]).toEqual(testColor2[0]);
        expect(testColor1[1]).toEqual(testColor2[1]);
        expect(testColor1[2]).toEqual(testColor2[2]);
    });
});