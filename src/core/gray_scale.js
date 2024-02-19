/**
 *  Functiom that given array in the format [R, G, B, alfa,..., R, G, B, alfa] it converts it gray scale in format [g1,g1,g1,alfa,...,gn,gn,gn,alfa]
 *  @param {number[]} pixelArray: image that has to be encrypt in the format [R, G, B, alfa,..., R, G, B, alfa]
 *  @returns {number[][]} grayScaledPixelArray: gray scale image in the format [g1, g1, g1, alfa,..., gn, gn, gn, alfa]
 */
function convertToGrayScale(pixelArray) {
    let grayScaledPixelArray = [];
    for (let i = 0; i < pixelArray.length / 4; i++) {
        const grayValue =
      Math.round(
          0.299 * pixelArray[4 * i] +
          0.587 * pixelArray[4 * i + 1] +
          0.114 * pixelArray[4 * i + 2]
      );
        grayScaledPixelArray.push(grayValue, grayValue, grayValue, pixelArray[4 * i + 3]);
    }
    return grayScaledPixelArray;
}

export default convertToGrayScale;
