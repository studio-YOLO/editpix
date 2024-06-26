/**
 * Optimizes contrast in an RGBA pixel array.
 * 
 * @param {number[]} pixelArray - An array representing pixel data in RGBA format.
 * @returns {number[]} An optimized pixel array with adjusted color values to enhance contrast.
 * 
 * @description This function optimizes contrast in an RGBA pixel array by rescaling the color 
 * values of each channel (red, green, blue) individually. 
 * Finally, it reconstructs the pixel array with the adjusted color values and returns the optimized pixel array.
 * 
 */
function optimizeContrast(pixelArray) {

    const rescaleArray = (originalArray) => {
        let min = 255;
        for (let i = 0; i < originalArray.length; i++) {
            if (originalArray[i] < min)
                min = originalArray[i];
        }
        let max = 0;
        for (let i = 0; i < originalArray.length; i++) {
            if (originalArray[i] > max)
                max = originalArray[i];
        }
        if (min != 0 || max != 255) {
            let newArray = originalArray.map((x) => Math.round((x-min)/(max-min) * 255));
            return newArray;
        }
        else
            return originalArray;
    }

    let r = [];
    let g = [];
    let b = [];
    for (let i = 0; i < pixelArray.length; i += 4)
        r.push(pixelArray[i]);
    for (let i = 1; i < pixelArray.length; i += 4)
        g.push(pixelArray[i]);
    for (let i = 2; i < pixelArray.length; i += 4)
        b.push(pixelArray[i]);
    r = rescaleArray(r);
    g = rescaleArray(g);
    b = rescaleArray(b);
    let newArray = [];
    for (let i = 0; i < pixelArray.length/4; i++) {
        newArray.push(r[i]);
        newArray.push(g[i]);
        newArray.push(b[i]);
        newArray.push(pixelArray[i*4 + 3]);
    }
    return newArray;
}

export default optimizeContrast;