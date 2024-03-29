
/**
 *  Function that, given an array in the format [R, G, B, alpha,..., R, G, B, alpha], rescales each of its color channels to use the full 0-255 range
 *  @param {number[]} pixelArray: image that has to be encrypted in the format [R, G, B, alpha,..., R, G, B, alpha]
 *  @returns {number[]} optimizedArray: an array in the format [R, G, B, alpha,..., R, G, B, alpha]
 **/
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