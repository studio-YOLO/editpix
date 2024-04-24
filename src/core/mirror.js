import utils from "../utils.js";

/**
 * Function to mirror an image horizontally
 * @param {number[]} pixelArray: Image pixel array in the format [R, G, B, alpha,..., R, G, B, alpha]
 * @param {number} width: Width of the image
 * @param {number} height: Height of the image
 * @returns {number[]} mirroredPixelArray: Mirrored image pixel array in the format [R, G, B, alpha,..., R, G, B, alpha]
 */
function mirrorImageHorizontally(pixelArray, width, height) {
    const mirroredPixelArray = [];

    for (let y = 0; y < height; y++) {
        for (let x = width - 1; x >= 0; x--) {
            const pixelIndex = (y * width + (width - x - 1)) * 4;
            mirroredPixelArray.push(pixelArray[pixelIndex]); // Red
            mirroredPixelArray.push(pixelArray[pixelIndex + 1]); // Green
            mirroredPixelArray.push(pixelArray[pixelIndex + 2]); // Blue
            mirroredPixelArray.push(pixelArray[pixelIndex + 3]); // Alpha
        }
    }

    return mirroredPixelArray;
}

export default mirrorImageHorizontally;
