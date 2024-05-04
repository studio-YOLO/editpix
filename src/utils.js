/**
 * Removes the alpha channel from a pixel array.
 * 
 * @param {Uint8ClampedArray} pixelArray - The pixel array to process.
 * @returns {Array<Array<number>>} An array containing RGB values with alpha channel removed.
 */
function removeAlpha(pixelArray) {
    let result = [];
    for (let i = 0; i < pixelArray.length / 4; i++) {
        if (pixelArray[i * 4 + 3] >= 127) {
            result.push([pixelArray[i * 4], pixelArray[i * 4 + 1], pixelArray[i * 4 + 2]]);
        }
    }
    return result;
}

/**
 * Removes the alpha channel from a pixel array in serialized format.
 * 
 * @param {Uint8ClampedArray} pixelArray - The pixel array to process.
 * @returns {Array<number>} An array containing serialized RGB values with alpha channel removed.
 */
function removeAlphaSerialized(pixelArray) {
    let result = [];
    for (let i = 0; i < pixelArray.length / 4; i++) {
        result.push(pixelArray[i * 4], pixelArray[i * 4 + 1], pixelArray[i * 4 + 2]);
    }
    return result;
}

/**
 * Validates the quality and color number parameters.
 * 
 * @param {number} quality - The quality parameter to validate.
 * @param {number} colorNumber - The color number parameter to validate.
 * @throws {Error} Throws an error if the quality parameter is not between 1 and 10, or if the color number parameter is not between 1 and 15.
 */
function validate(quality, colorNumber) {
    if (quality < 1 || quality > 10) {
        throw new Error("The quality parameter is invalid: it must be a number between 1 and 10")
    }
    if (colorNumber < 1 || colorNumber > 15) {
        throw new Error("Color number is invalid.")
    }
}

/**
 * Deserializes a serialized array into an array of arrays.
 * 
 * @param {Array<number>} serializedArray - The serialized array to deserialize.
 * @returns {Array<Array<number>>} An array of arrays containing deserialized values.
 */
function deserializeArray(serializedArray) {
    const result = [];
    for (let i = 0; i < serializedArray.length; i += 3) {
        result.push(Array.from(serializedArray.slice(i, i + 3)));
    }
    return result;
}

export default {
    validate,
    removeAlpha,
    removeAlphaSerialized,
    deserializeArray
};