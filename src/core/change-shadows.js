/**
 * Changes the shadows of an RGBA pixel array.
 * 
 * @param {number[]} pixelArray - An array representing pixel data in RGBA format.
 * @param {number} factor - The shadow adjustment factor.
 * @returns {number[]} A pixel array with adjusted shadows.
 * 
 * @description This function changes the shadows of an RGBA pixel array by adjusting the RGB values of pixels with a luminance below 128. 
 * The factor determines the intensity of the shadow adjustment applied to those pixels. 
 * A positive factor increases the darkness of shadows, while a negative factor lightens shadows.
 * Finally, it returns the pixel array with adjusted shadows.
 * 
 */
function changeShadows(pixelArray, factor) {
    for (let i = 0; i < pixelArray.length; i += 4) {
        const luminance = (pixelArray[i] + pixelArray[i + 1] + pixelArray[i + 2]) / 3;

        if (luminance < 128) {
            pixelArray[i] += factor * (128 - luminance) / 128;
            pixelArray[i + 1] += factor * (128 - luminance) / 128;
            pixelArray[i + 2] += factor * (128 - luminance) / 128;
        }
    }
    return pixelArray;
}

export default changeShadows;
