/**
 * Function that given a color in the format [R,G,B] converts it to grayscale in the format [R,G,B]
 * and then calculates the color with the highest contrast.
 * @param {number[]} color Color that has to be converted and compared in the format [R,G,B]
 * @returns {number[]} Color with the higher contrast of the input color in the format [R,G,B]
 */
function higherColorContrast(color) {
    // Convert the color to grayscale
    const grayscale = [
        Math.round(0.299 * color[0] + 0.587 * color[1] + 0.114 * color[2]),
        Math.round(0.299 * color[0] + 0.587 * color[1] + 0.114 * color[2]),
        Math.round(0.299 * color[0] + 0.587 * color[1] + 0.114 * color[2])
    ];

    // Calculate the color with the highest contrast
    const contrastColor = grayscale.map(channel => channel > 128 ? 0 : 255);

    return contrastColor;
}

export default higherColorContrast;
