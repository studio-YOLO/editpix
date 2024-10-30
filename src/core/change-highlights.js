/**
 * Changes the highlights of an RGBA pixel array.
 * 
 * @param {number[]} pixelArray - An array representing pixel data in RGBA format.
 * @param {number} factor - The highlights adjustment factor.
 * @returns {number[]} A pixel array with adjusted highlights.
 * 
 * @description This function changes the highlights of an RGBA pixel array by adjusting the RGB values of pixels with a luminance above 128. 
 * The factor determines the intensity of the highlights adjustment applied to those pixels. 
 * A positive factor increases the brightness of highlights, while a negative factor decreases the brightness. 
 * Finally, it returns the pixel array with adjusted highlights.
 * 
 */
function changeHighlights(pixelArray, factor) {
    for (let i = 0; i < pixelArray.length; i += 4) {
        const luminance = (pixelArray[i] + pixelArray[i + 1] + pixelArray[i + 2]) / 3;

        if (luminance > 128) {
            pixelArray[i] += factor * (255 - luminance) / 128;
            pixelArray[i + 1] += factor * (255 - luminance) / 128;
            pixelArray[i + 2] += factor * (255 - luminance) / 128;
        }
    }
    return pixelArray;
}

export default changeHighlights;
