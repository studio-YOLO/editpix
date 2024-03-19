/**
 * Function to change the tint of an image.
 * @param {number[]} pixelArray: Image pixel array in the format [R, G, B, alpha,..., R, G, B, alpha].
 * @param {number} tint: Tint to apply (-100 to 100).
 * @returns {number[]} Pixel array of the image with adjusted tint.
 */
function changeTint(pixelArray, tint) {
    for (let i = 0; i < pixelArray.length; i += 4) {
        // Apply tint adjustment
        pixelArray[i + 1] += (255 - pixelArray[i + 1]) * (tint / 255);
    }
    return pixelArray;
}

export default changeTint;