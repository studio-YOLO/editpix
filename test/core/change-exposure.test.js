import changeExposure from "../../src/core/change-exposure.js";

describe('changeExposure', () => {
    test('should return an unchanged array if the factor is 0', () => {
        const color = [67, 141, 23];
        changeExposure(color, 0);
        expect(color).toEqual([67, 141, 23]);
    });
    test('should return a brighter array for positive factors', () => {
        const luma = (value) =>  (value[0] + value[1] + value[2])/3
        const color = [67, 141, 23];
        const luma1 = luma(color);
        changeExposure(color, 20);
        const luma2 = luma(color);
        expect(luma1).toBeLessThan(luma2);
    });
    test('should return a darker array for positive factors', () => {
        const luma = (value) =>  (value[0] + value[1] + value[2])/3
        const color = [67, 141, 23];
        const luma1 = luma(color);
        changeExposure(color, -20);
        const luma2 = luma(color);
        expect(luma1).toBeGreaterThan(luma2);
    });
});