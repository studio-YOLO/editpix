/**
 * Function to change the exposure of an image.
 * @param {number[]} pixelArray: Image pixel array in the format [R, G, B, alpha,..., R, G, B, alpha].
 * @param {number} factor: Factor to adjust the exposure (-100 to 100).
 * @returns {number[]} Pixel array of the image with adjusted exposure.
 */
function changeExposure(pixelArray, factor) {
    for (let i = 0; i < pixelArray.length; i += 4) {
        const r = pixelArray[i];
        const g = pixelArray[i + 1];
        const b = pixelArray[i + 2];

        // Apply exposure adjustment to each channel
        const newR = Math.max(0, Math.min(255, r + factor * 2.55)); // Factor scaled to range 0-255
        const newG = Math.max(0, Math.min(255, g + factor * 2.55));
        const newB = Math.max(0, Math.min(255, b + factor * 2.55));

        pixelArray[i] = newR;
        pixelArray[i + 1] = newG;
        pixelArray[i + 2] = newB;
    }
    return pixelArray;
}
