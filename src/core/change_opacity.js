/**
 *  Function that modifies the pixel array of an image by changing the alpha parameter with the one given as input
 *  @param {number[]} pixelArray: image that has to be encrypt in the format [R, G, B, alfa,..., R, G, B, alfa]
 *  @param {number[]} alphaValue: the alpha parameter that will be applied to the image
 *  @returns {number[]} opaquePixelArray: pixel array of the opaque image
 */
function changeOpacity(pixelArray, alphaValue) {
    for (let i = 0; i < pixelArray.length; i += 4) {
        pixelArray[i + 3] = alphaValue;
    }
    return pixelArray;
}

export default changeOpacity;