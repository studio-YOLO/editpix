/**
 *  Function that, given an array of pixels of an image in the format [R, G, B, alpha,..., R, G, B, alpha] adjusts 
 *  the red and blue levels to increase or decrease the temperature of the image.
 * 
 *  In particular:
 *  - if factor > 0: the image is heated.
 * 
 *  - if factor < 0: the image is cooled.
 * 
 *  @param {number[]} pixelArray: image that has to be encrypt in the format [R, G, B, alpha,..., R, G, B, alpha]
 *  @returns {number[]} result: image pixel array after transformation
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