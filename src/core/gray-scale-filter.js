/**
 * Converts an RGBA pixel array to grayscale.
 * 
 * @param {number[]} pixelArray - An array representing pixel data in RGBA format.
 * @returns {number[]} A grayscale version of the input pixel array.
 * 
 * @description This function converts an RGBA pixel array to grayscale by calculating the luminance of each 
 * pixel and setting the RGB values to the same grayscale value.
 * Finally, it returns the grayscale pixel array.
 * 
 */
function toGrayScale(pixelArray) {
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

export default toGrayScale;