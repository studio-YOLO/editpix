import changeSaturation from "../../src/core/change-saturation.js"
import {rgbToHsl, hslToRgb} from "../../src/core/colorspace-conversion.js";

describe('changeSaturation', () => {
    test('should not change anything if factor is 0', () => {
        const testColor1 = [173, 114, 255];
        const testColor2 = [173, 114, 255];
        changeSaturation(testColor1, 0)
        expect(testColor1[0]).toEqual(testColor2[0]);
        expect(testColor1[1]).toEqual(testColor2[1]);
        expect(testColor1[2]).toEqual(testColor2[2]);
    });
    test('should change something if factor is not 0', () => {
        const testColor1 = [173, 114, 234];
        const testColor2 = [173, 114, 234];
        changeSaturation(testColor1, 50);
        expect(testColor1[0]).not.toEqual(testColor2[0]);
        expect(testColor1[1]).not.toEqual(testColor2[1]);
        expect(testColor1[2]).not.toEqual(testColor2[2]);
    });
    test('should increase saturation for positive factors', () => {
        const testColor1 = [173, 114, 234];
        const testColor2 = [173, 114, 234];
        changeSaturation(testColor1, 50);
        expect(rgbToHsl(testColor2[0], testColor2[1], testColor2[2]).s)
            .toBeLessThan(rgbToHsl(testColor1[0], testColor1[1], testColor1[2]).s);
    });
    test('should decrease saturation for negative factors', () => {
        const testColor1 = [173, 114, 234];
        const testColor2 = [173, 114, 234];
        changeSaturation(testColor1, -50);
        expect(rgbToHsl(testColor2[0], testColor2[1], testColor2[2]).s)
            .toBeGreaterThan(rgbToHsl(testColor1[0], testColor1[1], testColor1[2]).s);
    });
});