/**
 * Converts an RGBA pixel array to a sepia-toned version.
 * 
 * @param {number[]} pixelArray - An array representing pixel data in RGBA format.
 * @returns {number[]} A sepia-toned version of the input pixel array.
 * 
 * @description This function converts an RGBA pixel array to a sepia-toned version by applying a sepia filter to each pixel.
 * 
 */
function toSepia(pixelArray) {
    for (let i = 0; i < pixelArray.length; i += 4) {
        let r = pixelArray[i];
        let g = pixelArray[i + 1];
        let b = pixelArray[i + 2];

        pixelArray[i] = r * 0.393 + g * 0.769 + b * 0.189;
        pixelArray[i + 1] = r * 0.349 + g * 0.686 + b * 0.168;
        pixelArray[i + 2] = r * 0.272 + g * 0.534 + b * 0.131;
    }
    return pixelArray;
}

export default toSepia;