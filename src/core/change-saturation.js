import {rgbToHsl, hslToRgb} from "../core/colorspace-conversion.js";

/**
 * Changes the saturation of an RGBA pixel array.
 * 
 * @param {number[]} pixelArray - An array representing pixel data in RGBA format.
 * @param {number} factor - The saturation adjustment factor.
 * @returns {number[]} A pixel array with adjusted saturation.
 * 
 * @description This function changes the saturation of an RGBA pixel array by adjusting the saturation value in the HSL (Hue, Saturation, Lightness) color space. 
 * The factor determines the amount of saturation adjustment applied to each pixel. 
 * A positive factor increases saturation, making colors more vibrant, while a negative factor decreases saturation, making colors less vibrant. 
 * A factor of 0 results in no change to the pixel array.
 * Finally, it returns the pixel array with adjusted saturation.
 * 
 */
function changeSaturation(pixelArray, factor) {
    if (factor == 0)
        return pixelArray;
    for (let i = 0; i < pixelArray.length; i += 4) {
        let hsl = rgbToHsl(pixelArray[i], pixelArray[i + 1], pixelArray[i + 2]);
        hsl.s = Math.max(0, Math.min(100, hsl.s += factor));
        const rgb = hslToRgb(hsl.h, hsl.s, hsl.l);

        pixelArray[i] = rgb.r;
        pixelArray[i + 1] = rgb.g;
        pixelArray[i + 2] = rgb.b;
    }
    return pixelArray;
}

export default changeSaturation;
