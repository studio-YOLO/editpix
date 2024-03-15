/**
 * Modifies shadows in the pixel array by multiplying the RGB values of pixels
 * with luminance less than 128 by the specified factor.
 * 
 * @param {Uint8ClampedArray} pixelArray - Array of pixels represented in RGBA format.
 * @param {number} factor - Multiplication factor for pixels with luminance less than 128.
 * @returns {Uint8ClampedArray} - The modified pixel array.
 */
function changeShadows(pixelArray, factor) {
    const len = pixelArray.length;
    const factorVector = [factor, factor, factor, 1];

    for (let i = 0; i < len; i += 4) {
        const luminance = (pixelArray[i] + pixelArray[i + 1] + pixelArray[i + 2]) / 3;
        const isShadow = luminance < 128;

        // If pixel is in shadow, multiply RGB values by factor
        if (isShadow) {
            for (let j = 0; j < 4; j++) {
                pixelArray[i + j] *= factor;
            }
        }
    }

    return pixelArray;
}

export default changeShadows;
