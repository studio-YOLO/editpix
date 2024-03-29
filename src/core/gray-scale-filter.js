/**
 *  Function to convert an image to grayscale.
 *  @param {number[]} pixelArray: Image pixel array in the format [R, G, B, alpha,..., R, G, B, alpha].
 *  @returns {number[]} array of grayscale pixels of an image.
 */
function convertToGrayScale(pixelArray) {
    for (let i = 0; i < pixelArray.length; i += 4) {
        const grayValue =
            0.299 * pixelArray[i] +
            0.587 * pixelArray[i + 1] +
            0.114 * pixelArray[i + 2];

        pixelArray[i] = grayValue;
        pixelArray[i + 1] = grayValue;
        pixelArray[i + 2] = grayValue;
    }
    return pixelArray;
}

export default convertToGrayScale;