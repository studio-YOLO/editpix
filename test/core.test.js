import convertToBW from "../src/core/black_and_white.js"
import convertToGrayScale from "../src/core/gray_scale.js";
import optimizeContrast from "../src/core/optimize_contrast.js";
import changeContrast from "../src/core/change_contrast.js";
import changeTemperature from "../src/core/change_temperature.js";

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
        const expectedOptimizedContrastArray = [255, 161, 0, 33, 0, 0, 255, 13, 124, 255, 160, 141];    //hand-computed rescaling
        expect(optimizeContrast(pixelArray)).toEqual(expectedOptimizedContrastArray);
    });

    test('skips rescaling if array is already optimized', () => {
        const pixelArray = [0, 0, 0, 0, 132, 4, 108, 0, 255, 255, 255, 0];  // RGBA values
        const expectedOptimizedContrastArray = [0, 0, 0, 0, 132, 4, 108, 0, 255, 255, 255, 0];  // untouched vector
        expect(optimizeContrast(pixelArray)).toEqual(expectedOptimizedContrastArray);
    });
});

describe('setContrast function', () => {
    test('rescales input vector correctly', () => {
        const pixelArray = [0, 0, 0, 11, 255, 255, 255, 23, 2, 128, 47, 71];    // RGBA values
        const expectedSetContrastArray = [2, 2, 2, 11, 253, 253, 253, 23, 2, 128, 10, 71];  //hand-computed rescaling
        expect(changeContrast(pixelArray, 10)).toEqual(expectedSetContrastArray);
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