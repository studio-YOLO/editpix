/**
 *  Function that changes an array of pixels to the format [R, G, B, alfa,..., R, G, B, alfa] by applying a sepia tone
 *  @param {number[]} pixelArray: image that has to be encrypt in the format [R, G, B, alfa,..., R, G, B, alfa]
 *  @returns {number[]} sepiaPixelArray: pixel array of a sepia-toned image
 */
function toSepia(pixelArray) {

    const clip = (value) => {
        return value < 255 ? value : 255;
    }

    for (let i = 0; i < pixelArray.length; i += 4) {
        let r = pixelArray[i];
        let g = pixelArray[i + 1];
        let b = pixelArray[i + 2];

        pixelArray[i] = clip(r * 0.393 + g * 0.769 + b * 0.189);
        pixelArray[i + 1] = clip(r * 0.349 + g * 0.686 + b * 0.168);
        pixelArray[i + 2] = clip(r * 0.272 + g * 0.534 + b * 0.131);
    }
    return pixelArray;
}

export default toSepia;