/**
 * Changes the temperature of an RGBA pixel array.
 * 
 * @param {number[]} pixelArray - An array representing pixel data in RGBA format.
 * @param {number} factor - The temperature adjustment factor.
 * @returns {number[]} A pixel array with adjusted temperature.
 * 
 * @description This function changes the temperature of an RGBA pixel array by adjusting the red and blue color channels. 
 * A positive factor increases the "warmth" of the image by adding red and reducing blue, while a negative 
 * factor increases the "coolness" by reducing red and adding blue. 
 * Finally, it returns the pixel array with adjusted temperature.
 * 
 */
function changeTemperature(pixelArray, factor) {
    const clip = (value) => {
        return Math.round(Math.min(Math.max(value, 0), 255));
    };

    for (let i = 0; i < pixelArray.length; i += 4) {
        if (factor < 0) {
            pixelArray[i] -= clip(Math.abs(factor)); //red
            pixelArray[i + 2] += clip(Math.abs(factor)); //blue
        } else if (factor > 0) {
            pixelArray[i] += clip(Math.abs(factor)); //red
            pixelArray[i + 2] -= clip(Math.abs(factor)); //blue
        }
    }

    return pixelArray;
}

export default changeTemperature;