/**
 * Changes the contrast of an RGBA pixel array.
 * 
 * @param {number[]} pixelArray - An array representing pixel data in RGBA format.
 * @param {number} factor - The contrast adjustment factor.
 * @returns {number[]} A pixel array with adjusted contrast.
 * 
 * @description This function changes the contrast of an RGBA pixel array by applying a contrast adjustment factor to each color channel. 
 * It uses a sigmoid curve function to adjust the contrast, with the given factor determining the steepness of the curve. 
 * A factor of 0 results in no change to the pixel array. 
 * For non-zero factors, it applies the sigmoid curve transformation to each color channel except for the alpha channel. 
 * Finally, it returns the pixel array with adjusted contrast.
 * 
 */
function changeContrast(pixelArray, factor) {
    if (factor == 0)
        return pixelArray;
    const sCurve = (x) => {
        return 255 / (1 + Math.exp(-factor * (x - 128) / 255));
    }
    for (let i = 0; i < pixelArray.length; i++) {
        if ((i+1) % 4 != 0)
            pixelArray[i] = sCurve(pixelArray[i]);
    }
    return pixelArray;
}

export default changeContrast;