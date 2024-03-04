/**
 *  Function to convert an image from color to black and white.
 *  @param {number[]} pixelArray: Image pixel array in the format [R, G, B, alpha,..., R, G, B, alpha].
 *  @returns {number[]} array of black and white image pixels.
 */
function convertToBW(pixelArray) {
    for (let i = 0; i < pixelArray.length; i += 4) {
        const grayValue =
            0.299 * pixelArray[i] +
            0.587 * pixelArray[i + 1] +
            0.114 * pixelArray[i + 2];
        if (grayValue >= 128) {
            pixelArray[i] = 255;
            pixelArray[i + 1] = 255;
            pixelArray[i + 2] = 255;
        }else {
            pixelArray[i] = 0;
            pixelArray[i + 1] = 0;
            pixelArray[i + 2] = 0;
        }
    }
    return pixelArray;
}

export default convertToBW;
