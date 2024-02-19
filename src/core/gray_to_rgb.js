/**
 *  Function that given array in the format [g1,g1,g1,alfa1,...,gn,gn,gn,alfan] it converts it gray scale in format [R,G,B,alfa,...,R,G,B,alfa]
 *  @param {number[]} pixelArray: image that has to be encrypt in the format [g1,g1,g1,alfa1,...,gn,gn,gn,alfan]
 *  @returns {number[][]} encrypted_image: gray scale  image in the format [R,G,B,alfa,...,R,G,B,alfa]
 */
function convertFronGrayToRgb(pixelArray) {
    var rgbPixelArray = [];
    for (let i = 0; i < pixelArray.length / 4; i++) {
        rgbPixelArray.push(
            Math.round(pixelArray[4 * i] / 0.299),
            Math.round(pixelArray[4 * i] / 0.587),
            Math.round(pixelArray[4 * i] / 0.114),
            pixelArray[4 * i + 3]
        );
    }
    return rgbPixelArray;
}

export default convertFronGrayToRgb;
