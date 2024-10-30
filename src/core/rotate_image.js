import utils from "../utils.js";

/**
 * Function to rotate an image by a specified angle
 * @param {number[]} pixelArray: Image pixel array in the format [R, G, B, alpha,..., R, G, B, alpha]
 * @param {number} angle: Angle to rotate the image (in degrees)
 * @returns {number[]} pixelArray: Rotated image pixel array in the format [R, G, B, alpha,..., R, G, B, alpha]
 */
function rotateImage(pixelArray, angle, width, height) {
    const radians = angle * Math.PI / 180;
    const cosTheta = Math.cos(radians);
    const sinTheta = Math.sin(radians);

    const center_x = width / 2;
    const center_y = height / 2;

    const tempPixelArray = [...pixelArray]; // Create a copy of the original pixel array

    for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
            const source_x = (x - center_x) * cosTheta + (y - center_y) * sinTheta + center_x;
            const source_y = -(x - center_x) * sinTheta + (y - center_y) * cosTheta + center_y;

            if (source_x >= 0 && source_x < width && source_y >= 0 && source_y < height) {
                const source_x1 = Math.floor(source_x);
                const source_x2 = Math.ceil(source_x);
                const source_y1 = Math.floor(source_y);
                const source_y2 = Math.ceil(source_y);

                const tX = source_x - source_x1;
                const tY = source_y - source_y1;

                const index1 = (source_y1 * width + source_x1) * 4;
                const index2 = (source_y1 * width + source_x2) * 4;
                const index3 = (source_y2 * width + source_x1) * 4;
                const index4 = (source_y2 * width + source_x2) * 4;

                const R1 = tempPixelArray[index1] * (1 - tX) + tempPixelArray[index2] * tX;
                const R2 = tempPixelArray[index3] * (1 - tX) + tempPixelArray[index4] * tX;
                const R = R1 * (1 - tY) + R2 * tY;

                const G1 = tempPixelArray[index1 + 1] * (1 - tX) + tempPixelArray[index2 + 1] * tX;
                const G2 = tempPixelArray[index3 + 1] * (1 - tX) + tempPixelArray[index4 + 1] * tX;
                const G = G1 * (1 - tY) + G2 * tY;

                const B1 = tempPixelArray[index1 + 2] * (1 - tX) + tempPixelArray[index2 + 2] * tX;
                const B2 = tempPixelArray[index3 + 2] * (1 - tX) + tempPixelArray[index4 + 2] * tX;
                const B = B1 * (1 - tY) + B2 * tY;

                const index = (y * width + x) * 4;
                pixelArray[index] = R;
                pixelArray[index + 1] = G;
                pixelArray[index + 2] = B;
                pixelArray[index + 3] = tempPixelArray[index1 + 3];
            } else {
                const index = (y * width + x) * 4;
                pixelArray[index] = 0; // Red
                pixelArray[index + 1] = 0; // Green
                pixelArray[index + 2] = 0; // Blue
                pixelArray[index + 3] = 0; // Alpha
            }
        }
    }

    return pixelArray;
}

export default rotateImage;
