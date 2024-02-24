/**
 *  Function that, given an array in the format [R, G, B, alpha,..., R, G, B, alpha], rescales each of its color channels along an s-curve to change the contrast
 *  @param {number[]} pixelArray: image that has to be encrypted in the format [R, G, B, alpha,..., R, G, B, alpha]
 *  @param {number} factor: scale factor for the s-curve
 *  @returns {number[]} contrastArray: an array in the format [R, G, B, alpha,..., R, G, B, alpha]
 **/
function setContrast(pixelArray, factor) {
    const clip = (value) => {
        return Math.round(Math.min(Math.max(value, 0), 255));
    }
    const sCurve = (x) => {
        return clip(255 / (1 + Math.exp(-factor * (x - 128) / 255)));
    }
    const newArray = [];
    for (let i = 0; i < pixelArray.length; i++) {
        if ((i+1) % 4 != 0)
            newArray.push(sCurve(pixelArray[i]));
        else
            newArray.push(pixelArray[i]);
    }
    
    return newArray;
}

export default setContrast;