/**
 * Changes the opacity (alpha value) of an RGBA pixel array.
 * 
 * @param {number[]} pixelArray - An array representing pixel data in RGBA format.
 * @param {number} alphaValue - The new alpha value (opacity) to set for all pixels.
 * @returns {number[]} A pixel array with adjusted opacity.
 * 
 * @description This function changes the opacity (alpha value) of an RGBA pixel array by 
 * setting the alpha channel (transparency) to a specified value for all pixels. 
 * Finally, it returns the pixel array with adjusted opacity.
 * 
 */
function changeOpacity(pixelArray, alphaValue) {
    for (let i = 0; i < pixelArray.length; i += 4) {
        pixelArray[i + 3] = alphaValue;
    }
    return pixelArray;
}

export default changeOpacity;