/**
 * Function that given a color in the RGB format converts it to grayscale
 * and then calculates the color (black or white) with the highest contrast.
 * @param {number} r red color value
 * @param {number} g green color value
 * @param {number} b blue color value
 * @returns {object} Color with the higher contrast of the input color in the format {r: value, g:value, b:value}
 */
function higherColorContrast(r, g, b) {
    const gray = Math.round(0.299 * r + 0.587 * g + 0.114 * b)
    const contrastColor = gray >= 128 ? 0 : 255;
    return {
        r: contrastColor,
        g: contrastColor,
        b: contrastColor
    };
}

export default higherColorContrast;
