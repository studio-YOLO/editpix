/**
 * Function that given a color in the format [R,G,B] converts it to grayscale in the format [R,G,B]
 * and then calculates the color (black or white) with the highest contrast.
 * @param {number[]} color Color that has to be converted and compared in the format [R,G,B]
 * @returns {number[]} Color with the higher contrast of the input color in the format [R,G,B]
 */
function higherColorContrast(color) {
    const gray = Math.round(0.299 * color[0] + 0.587 * color[1] + 0.114 * color[2])
    const contrastColor = gray >= 128 ? 0 : 255;
    return [contrastColor, contrastColor, contrastColor];
}

export default higherColorContrast;
