/**
 * Changes the tint of an RGBA pixel array.
 * 
 * @param {number[]} pixelArray - An array representing pixel data in RGBA format.
 * @param {number} tint - The tint adjustment value.
 * @returns {number[]} A pixel array with adjusted tint.
 * 
 * @description This function changes the tint of an RGBA pixel array by adjusting the green channel (G) value based on the specified tint adjustment value.
 * A higher tint value increases the green channel (making the image more green), while a lower tint value decreases the green channel (making the image less green).
 * Finally, it returns the pixel array with adjusted tint.
 * 
 */
function changeTint(pixelArray, tint) {
    for (let i = 0; i < pixelArray.length; i += 4) {
        // Apply tint adjustment
        pixelArray[i + 1] += (255 - pixelArray[i + 1]) * (tint / 255);
    }
    return pixelArray;
}

export default changeTint;