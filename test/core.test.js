import kMeans from "../src/core/kmean.js"
import convertToBW from "../src/core/black_and_white.js"
import convertToGrayScale from "../src/core/gray_scale.js";

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

describe('kMeans function', () => {
    test('performs K-Means clustering correctly', () => {
        // Sample colors for clustering
        const colors = [
            [255, 0, 0],   // Red
            [0, 255, 0],   // Green
            [0, 0, 255],   // Blue
            [255, 255, 0], // Yellow
            [255, 0, 255], // Magenta
            [0, 255, 255], // Cyan
        ];

        // Number of clusters
        const k = 3;

        // Perform K-Means clustering
        const clusters = kMeans(colors, k);

        // Ensure correct number of clusters
        expect(clusters.length).toBe(k);

        // Ensure each cluster contains colors
        clusters.forEach(cluster => {
            expect(cluster.length).toBeGreaterThan(0);
            expect(cluster.every(color => colors.some(c => c.toString() === color.toString()))).toBe(true);
        });
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
