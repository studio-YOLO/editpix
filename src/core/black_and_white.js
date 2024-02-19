/**
 *  Functiom that given array in the format [R, G, B, alpha,..., R, G, B, alpha] it converts in white and black in the format of a list. Possible values are just 0 and 255
 *  @param {number[][]} pixelArray: image that has to be encrypt in the format [R, G, B, alpha,..., R, G, B, alpha]
 *  @returns {number[]} blackWhitePixelArray: black and white image in the format of a list. Possible values are just 0 and 255
 */
function convertToBW(pixelArray) {
    var blackWhitePixelArray = [];
    for (let i = 0; i < pixelArray.length / 4; i++) {
        var grayValue =
      Math.round(
          0.299 * pixelArray[i * 4] +
          0.587 * pixelArray[i * 4 + 1] +
          0.114 * pixelArray[i * 4 + 2]
      );
        if (grayValue >= 128) blackWhitePixelArray.push(255, 255, 255, pixelArray[i * 4 + 3]);
        else blackWhitePixelArray.push(0, 0, 0, pixelArray[i * 4 + 3]);
    }
    return blackWhitePixelArray;
}

export default convertToBW;
