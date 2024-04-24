import utils from "../utils.js";

/**
 * Function to change the saturation of an image.
 * @param {number[]} pixelArray: Image pixel array in the format [R, G, B, alpha,..., R, G, B, alpha].
 * @param {number} factor: factor to adjust the saturation (-100 to 100).
 * @returns {number[]} pixel array of the saturated or desaturated image.
 */
function changeSaturation(pixelArray, factor) {
    if (factor == 0)
        return pixelArray;
    for (let i = 0; i < pixelArray.length; i += 4) {
        let hsl = utils.rgbToHsl(pixelArray[i], pixelArray[i + 1], pixelArray[i + 2]);
        hsl.s = Math.max(0, Math.min(100, hsl.s += factor));
        const rgb = utils.hslToRgb(hsl.h, hsl.s, hsl.l);

        pixelArray[i] = rgb.r;
        pixelArray[i + 1] = rgb.g;
        pixelArray[i + 2] = rgb.b;
    }
    return pixelArray;
}

export default changeSaturation;
