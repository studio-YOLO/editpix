import {rgbToHsl, hslToRgb} from "../core/colorspace-conversion.js";

/**
 * Changes the brightness of an RGBA pixel array.
 * 
 * @param {number[]} pixelArray - An array representing pixel data in RGBA format.
 * @param {number} factor - The brightness adjustment factor.
 * @returns {number[]} A pixel array with adjusted brightness.
 * 
 * @description This function changes the brightness of an RGBA pixel array by adjusting 
 * the lightness value in the HSL (Hue, Saturation, Lightness) color space. 
 * The factor determines the amount of brightness adjustment applied to each pixel. 
 * A positive factor increases brightness, making the image lighter, while a negative 
 * factor decreases brightness, making the image darker. 
 * A factor of 0 results in no change to the pixel array. 
 * Finally, it returns the pixel array with adjusted brightness.
 * 
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
