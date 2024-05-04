/**
 * Determines a color with higher contrast based on the input RGB values.
 * 
 * @param {number} r - The red component value (0 to 255).
 * @param {number} g - The green component value (0 to 255).
 * @param {number} b - The blue component value (0 to 255).
 * @returns {Object} An object containing the RGB values of the color with higher contrast.
 * 
 * @description This function calculates the grayscale value of the input RGB color using a weighted sum of the color components. 
 * It then determines a color with higher contrast based on whether the grayscale value is above or below a threshold (128). 
 * If the grayscale value is above the threshold, indicating a lighter color, the function returns an object with RGB values set 
 * to 0, resulting in a darker color. If the grayscale value is below the threshold, indicating a darker color, the function returns 
 * an object with RGB values set to 255, resulting in a lighter color. 
 * The function returns an object representing the color with higher contrast.
 * 
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
