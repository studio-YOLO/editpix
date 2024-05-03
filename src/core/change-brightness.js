import {rgbToHsl, hslToRgb} from "../core/colorspace-conversion.js";

/**
 * Function to change the brightness of an image
 * @param {number[]} pixelArray: Image pixel array in the format [R, G, B, alpha,..., R, G, B, alpha]
 * @param {number} factor: factor to adjust the brightness (-100 to 100)
 * @returns {number[]} adjustedPixelArray: Adjusted image pixel array in the format [R, G, B, alpha,..., R, G, B, alpha]
 */
function changeBrightness(pixelArray, factor) {
    if (factor == 0)
        return pixelArray;
    for (let i = 0; i < pixelArray.length; i += 4) {
        const hsl = rgbToHsl(pixelArray[i], pixelArray[i + 1], pixelArray[i + 2]);
        hsl.l = Math.max(0, Math.min(100, hsl.l += factor));
        const rgb = hslToRgb(hsl.h, hsl.s, hsl.l);

        pixelArray[i] = rgb.r;
        pixelArray[i + 1] = rgb.g;
        pixelArray[i + 2] = rgb.b;
    }
    return pixelArray;
}

export default changeBrightness;
