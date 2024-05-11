/**
 * Function to mirror an image horizontally
 * @param {number[]} pixelArray: Image pixel array in the format [R, G, B, alpha,..., R, G, B, alpha]
 * @returns {number[]} mirroredPixelArray: Mirrored image pixel array in the format [R, G, B, alpha,..., R, G, B, alpha]
 */
function mirrorImageHorizontally(pixelArray) {
    const pixelCount = pixelArray.length / 4; // Assuming each pixel has 4 values: R, G, B, alpha
    const sideLength = Math.sqrt(pixelCount); // Assuming the image is square

    const mirroredPixelArray = [];

    for (let y = 0; y < sideLength; y++) {
        for (let x = sideLength - 1; x >= 0; x--) {
            const pixelIndex = (y * sideLength + (sideLength - x - 1)) * 4;
            mirroredPixelArray.push(pixelArray[pixelIndex]); // Red
            mirroredPixelArray.push(pixelArray[pixelIndex + 1]); // Green
            mirroredPixelArray.push(pixelArray[pixelIndex + 2]); // Blue
            mirroredPixelArray.push(pixelArray[pixelIndex + 3]); // Alpha
        }
    }

    return mirroredPixelArray;
}
