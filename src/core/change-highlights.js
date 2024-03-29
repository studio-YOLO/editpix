/**
 *  Function that modifies the pixel array of an image by brightening or darkening the highlight areas by a given factor
 *  @param {number[]} pixelArray: image that has to be encoded in the format [R, G, B, alpha,..., R, G, B, alpha]
 *  @param {number[]} factor: the shadow brightening/darkening parameter that will be applied to the image
 *  @returns {number[]} outputArray: pixel array of the modified image
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
