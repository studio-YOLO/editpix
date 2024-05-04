/**
 * Converts an RGBA pixel array to black and white.
 * 
 * @param {number[]} pixelArray - An array representing pixel data in RGBA format.
 * @returns {number[]} A black and white version of the input pixel array.
 * 
 * @description This function converts an RGBA pixel array to black and white by calculating 
 * the grayscale value of each pixel and setting the RGB values to either 0 (black) or 255 (white) based on a threshold. 
 * Finally, it returns the black and white pixel array.
 * 
 */
function toBlackWhite(pixelArray) {
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

export default toBlackWhite;
