import changeTint from "../../src/core/change-tint.js";

describe('changeTint', () => {
    test('should not change anything if factor is 0', () => {
        const testColor1 = [173, 114, 255];
        changeTint(testColor1, 0);
    });
    test('should change color if factor is not 0, and only change g component', () => {
        const testColor1 = [173, 114, 234];
        const testColor2 = [173, 114, 234];
        changeTint(testColor1, 50);
        expect(testColor1[0]).toEqual(testColor2[0]);
        expect(testColor1[1]).not.toEqual(testColor2[1]);
        expect(testColor1[2]).toEqual(testColor2[2]);
    });
    test('should not change color if value is 255', () => {
        const testColor1 = [173, 0, 255];
        const testColor2 = [173, 0, 255];
        changeTint(testColor1, 50);
        expect(testColor1[1]).not.toEqual(testColor2[1]);
    });
});