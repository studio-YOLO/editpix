/**
 *  Function that, given an array in the format [R, G, B, alpha,..., R, G, B, alpha], rescales each of its color channels along an s-curve to change the contrast
 *  @param {number[]} pixelArray: image that has to be encrypted in the format [R, G, B, alpha,..., R, G, B, alpha]
 *  @param {number} factor: scale factor for the s-curve
 *  @returns {number[]} contrastArray: an array in the format [R, G, B, alpha,..., R, G, B, alpha]
 **/
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