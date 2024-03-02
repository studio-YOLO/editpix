import utils from "../utils.js";

/**
 * Function to change the brightness of an image
 * @param {number[]} pixelArray: Image pixel array in the format [R, G, B, alpha,..., R, G, B, alpha]
 * @param {number} factor: factor to adjust the brightness (-100 to 100)
 * @returns {number[]} adjustedPixelArray: Adjusted image pixel array in the format [R, G, B, alpha,..., R, G, B, alpha]
 */
function changeBrightness(pixelArray, factor) {
    const adjustedPixelArray = [];
    for (let i = 0; i < pixelArray.length; i += 4) {
        const hsl = utils.rgbToHsl(pixelArray[i], pixelArray[i + 1], pixelArray[i + 2]);
        hsl[2] = Math.max(0, Math.min(100, hsl[2] += factor));
        const rgb = utils.hslToRgb(hsl[0], hsl[1], hsl[2]);

        adjustedPixelArray.push(rgb[0], rgb[1], rgb[2], pixelArray[i + 3]);
    }
    return adjustedPixelArray;
}

export default changeBrightness;
