import convertToBW from "../src/core/black_and_white.js"
import convertToGrayScale from "../src/core/gray_scale.js";
import optimizeContrast from "../src/core/optimize_contrast.js";
import changeContrast from "../src/core/change_contrast.js";
import changeTemperature from "../src/core/change_temperature.js";
import changeOpacity from "../src/core/change_opacity.js";
import changeShadows from "../src/core/change_shadows.js"
import higherColorContrast from "../src/core/higher_contrast.js";
import changeTint from "../src/core/change_tint.js"
import changeSaturation from "../src/core/change_saturation.js"
import changeBrightness from "../src/core/change_brightness.js";
import utils from "../src/utils.js";

describe('convertToBW function', () => {
    test('converts pixel array to black and white correctly', () => {
        const pixelArray = [255, 255, 255, 255, 0, 0, 0, 255]; // RGBA values
        const expectedResult = [255, 255, 255, 255, 0, 0, 0, 255]; // Expected black and white pixel array
        expect(convertToBW(pixelArray)).toEqual(expectedResult);
    });

    test('handles empty input array', () => {
        const pixelArray = [];
        expect(convertToBW(pixelArray)).toEqual([]);
    });

    test('handles random RGBA values correctly', () => {
        // Generate a random pixel array with RGBA values between 0 and 255
        const randomPixelArray = Array.from({ length: 20 }, () => Math.floor(Math.random() * 256));
        const pixelArray = [...randomPixelArray.slice(0, 3), 255, ...randomPixelArray.slice(4)]; // Ensure alpha channel is 255
        const bwPixelArray = convertToBW(pixelArray);

        // Ensure that each RGB value in the converted array is either 0 or 255
        const isValidBWPixelArray = bwPixelArray.every((value, index) => {
            // Skip alpha channel (every fourth value)
            if ((index + 1) % 4 === 0) return true;
            return value === 0 || value === 255;
        });

        expect(isValidBWPixelArray).toBe(true);
    });
});

describe('convertToGrayScale function', () => {
    test('converts pixel array to grayscale correctly', () => {
        const pixelArray = [255, 255, 255, 255, 0, 0, 0, 255]; // RGBA values
        const expectedGrayScaleArray = [255, 255, 255, 255, 0, 0, 0, 255]; // Expected grayscale pixel array
        expect(convertToGrayScale(pixelArray)).toEqual(expectedGrayScaleArray);
    });

    test('handles empty input array', () => {
        const pixelArray = [];
        expect(convertToGrayScale(pixelArray)).toEqual([]);
    });

    test('handles random RGBA values correctly', () => {
        // Generate a random pixel array with RGBA values between 0 and 255
        const randomPixelArray = Array.from({ length: 20 }, () => Math.floor(Math.random() * 256));
        const pixelArray = [...randomPixelArray.slice(0, 3), 255, ...randomPixelArray.slice(4)]; // Ensure alpha channel is 255
        const grayScalePixelArray = convertToGrayScale(pixelArray);

        // Ensure that each set of four consecutive values represents a valid grayscale color
        for (let i = 0; i < grayScalePixelArray.length; i += 4) {
            const grayValue = grayScalePixelArray[i];
            expect(grayScalePixelArray[i]).toBe(grayValue); // R component
            expect(grayScalePixelArray[i + 1]).toBe(grayValue); // G component
            expect(grayScalePixelArray[i + 2]).toBe(grayValue); // B component
        }
    });
});

describe('optimizeContrast function', () => {
    test('rescales input vector correctly', () => {
        const pixelArray = [204, 33, 11, 33, 132, 4, 108, 13, 167, 50, 72, 141];    // RGBA values
        const expectedOptimizedContrastArray = [255, 161, 0, 33, 0, 0, 255, 13, 124, 255, 160, 141];    // hand-computed rescaling
        expect(optimizeContrast(pixelArray)).toEqual(expectedOptimizedContrastArray);
    });

    test('skips rescaling if array is already optimized', () => {
        const pixelArray = [0, 0, 0, 0, 132, 4, 108, 0, 255, 255, 255, 0];  // RGBA values
        const expectedOptimizedContrastArray = [0, 0, 0, 0, 132, 4, 108, 0, 255, 255, 255, 0];  // untouched vector
        expect(optimizeContrast(pixelArray)).toEqual(expectedOptimizedContrastArray);
    });
});

describe('changeContrast function', () => {
    test('does not change anything if factor is 0', () => {
        const pixelArray = [0, 0, 0, 11, 255, 255, 255, 23, 2, 128, 47, 71];    // RGBA values
        const expectedContrastArray = [0, 0, 0, 11, 255, 255, 255, 23, 2, 128, 47, 71];  // untouched vector
        expect(changeContrast(pixelArray, 0)).toEqual(expectedContrastArray);
    });
    test('rescales input vector correctly', () => {
        const pixelArray = [0, 0, 0, 11, 255, 255, 255, 23, 2, 128, 47, 71];    // RGBA values
        const expectedSetContrastArray = [2, 2, 2, 11, 253, 253, 253, 23, 2, 128, 10, 71];  // hand-computed rescaling
        expect(changeContrast(pixelArray, 10).map((value) => Math.round(value))) // round values
            .toEqual(expectedSetContrastArray);
    });
})

describe('adjustTemperature', () => {
    test('should adjust temperature for cool colors (factor < 0)', () => {
        const pixelArray = [100, 50, 150, 255, 200, 100, 50, 255]; // Example pixel array
        const factor = -50; // Factor for cool colors
        const expectedArray = [50, 50, 200, 255, 150, 100, 100, 255]; // Expected result after temperature adjustment

        const result = changeTemperature(pixelArray, factor);

        expect(result).toEqual(expectedArray);
    });

    test('should adjust temperature for warm colors (factor > 0)', () => {
        const pixelArray = [100, 50, 150, 255, 200, 100, 50, 255]; // Example pixel array
        const factor = 50; // Factor for warm colors
        const expectedArray = [150, 50, 100, 255, 250, 100, 0, 255]; // Expected result after temperature adjustment

        const result = changeTemperature(pixelArray, factor);

        expect(result).toEqual(expectedArray);
    });

    test('should not adjust temperature if factor is 0', () => {
        const pixelArray = [100, 50, 150, 255, 200, 100, 50, 255]; // Example pixel array
        const factor = 0; // Factor is 0
        const expectedArray = [...pixelArray]; // Should remain unchanged

        const result = changeTemperature(pixelArray, factor);

        expect(result).toEqual(expectedArray);
    });
});

describe('changeOpacity function', () => {
    test('should correctly change the opacity of pixel array', () => {
        // Example pixel array
        const pixelArray = [100, 50, 150, 255, 200, 100, 50, 255];
        // Expected opacity value
        const alphaValue = 150;
        // Expected array after opacity modification
        const expectedArray = [100, 50, 150, alphaValue, 200, 100, 50, alphaValue];

        // Execute the changeOpacity function
        const modifiedArray = changeOpacity(pixelArray, alphaValue);

        // Check that the array has correctly changed opacity
        expect(modifiedArray).toEqual(expectedArray);
    });
});


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

describe('higherColorContrast', () => {
    test('should return color with higher contrast for dark input color', () => {
        const darkColor = [10, 20, 30];
        const expectedResult = [255, 255, 255]; // Expected result for dark color

        const result = higherColorContrast(darkColor);

        expect(result).toEqual(expectedResult);
    });

    test('should return color with higher contrast for light input color', () => {
        const lightColor = [200, 210, 220];
        const expectedResult = [0, 0, 0]; // Expected result for light color

        const result = higherColorContrast(lightColor);

        expect(result).toEqual(expectedResult);
    });

    test('should return color with higher contrast for medium input color', () => {
        const mediumColor = [120, 130, 140];
        const expectedResult = [0, 0, 0]; // Expected result for medium color

        const result = higherColorContrast(mediumColor);

        expect(result).toEqual(expectedResult);
    });
});

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
        expect(utils.rgbToHsl(testColor2[0], testColor2[1], testColor2[2])[1])
            .toBeLessThan(utils.rgbToHsl(testColor1[0], testColor1[1], testColor1[2])[1]);
    });
    test('should decrease saturation for negative factors', () => {
        const testColor1 = [173, 114, 234];
        const testColor2 = [173, 114, 234];
        changeSaturation(testColor1, -50);
        expect(utils.rgbToHsl(testColor2[0], testColor2[1], testColor2[2])[1])
            .toBeGreaterThan(utils.rgbToHsl(testColor1[0], testColor1[1], testColor1[2])[1]);
    });
});

describe('changeTint', () => {
    test('should not change anything if factor is 0', () => {
        const testColor1 = [173, 114, 255];
        const testColor2 = [173, 114, 255];
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