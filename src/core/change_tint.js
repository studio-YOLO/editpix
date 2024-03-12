/**
 * Function to change the tint of an image.
 * @param {number[]} pixelArray: Image pixel array in the format [R, G, B, alpha,..., R, G, B, alpha].
 * @param {number} tint: Tint to apply (-100 to 100).
 * @returns {number[]} Pixel array of the image with adjusted tint.
 */
function changeTint(pixelArray, tint) {
    for (let i = 0; i < pixelArray.length; i += 4) {
        const r = pixelArray[i];
        const g = pixelArray[i + 1];
        const b = pixelArray[i + 2];
        
        // Apply tint adjustment to each channel
        const newR = Math.max(0, Math.min(255, r + (255 - r) * (tint / 100)));
        const newG = Math.max(0, Math.min(255, g + (255 - g) * (tint / 100)));
        const newB = Math.max(0, Math.min(255, b + (255 - b) * (tint / 100)));

        pixelArray[i] = newR;
        pixelArray[i + 1] = newG;
        pixelArray[i + 2] = newB;
    }
    return pixelArray;
}
