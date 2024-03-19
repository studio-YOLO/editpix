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
        const hsl = utils.rgbToHsl(pixelArray[i], pixelArray[i + 1], pixelArray[i + 2]);
        hsl[1] = Math.max(0, Math.min(100, hsl[1] += factor));
        const rgb = utils.hslToRgb(hsl[0], hsl[1], hsl[2]);

        pixelArray[i] = rgb[0];
        pixelArray[i + 1] = rgb[1];
        pixelArray[i + 2] = rgb[2];
    }
    return pixelArray;
}

export default changeSaturation;
