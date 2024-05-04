/**
 * Changes the exposure of an RGBA pixel array.
 * 
 * @param {number[]} pixelArray - An array representing pixel data in RGBA format.
 * @param {number} factor - The exposure adjustment factor.
 * @returns {number[]} A pixel array with adjusted exposure.
 * 
 * @description This function changes the exposure of an RGBA pixel array by applying an exposure adjustment factor to each RGB channel of every pixel. 
 * The factor determines the intensity of the exposure adjustment. 
 * A positive factor increases the brightness of the image, while a negative factor decreases the brightness. 
 * The factor is applied to each RGB channel independently.
 * Finally, it returns the pixel array with adjusted exposure.
 * 
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

export default changeExposure;