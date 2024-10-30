/**
 * Function to mirror an image horizontally
 * @param {number[]} pixelArray: Image pixel array in the format [R, G, B, alpha,..., R, G, B, alpha]
 * @returns {number[]} mirroredPixelArray: Mirrored image pixel array in the format [R, G, B, alpha,..., R, G, B, alpha]
*/

function mirrorImageHorizontally(pixelArray, sideLength) {
    const pixelCount = pixelArray.length / 4; // Assuming each pixel has 4 values: R, G, B, alpha

    for (let y = 0; y < sideLength; y++) {
        for (let x = 0; x < sideLength / 2; x++) {
            const leftPixelIndex = (y * sideLength + x) * 4;
            const rightPixelIndex = (y * sideLength + (sideLength - x - 1)) * 4;

            // Swap pixels
            for (let i = 0; i < 4; i++) {
                const temp = pixelArray[leftPixelIndex + i];
                pixelArray[leftPixelIndex + i] = pixelArray[rightPixelIndex + i];
                pixelArray[rightPixelIndex + i] = temp;
            }
        }
    }

    return pixelArray;
}

export default mirrorImageHorizontally;
