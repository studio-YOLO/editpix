function changeSharpness(pixelArray, width, height, factor) {
    // Define a sharpening kernel
    const kernel = [
        [0, -1, 0],
        [-1, 5, -1],
        [0, -1, 0]
    ];

    const tempPixelArray = [...pixelArray];

    for (let y = 1; y < height - 1; y++) {
        for (let x = 1; x < width - 1; x++) {
            let sumR = 0, sumG = 0, sumB = 0;
            for (let ky = -1; ky <= 1; ky++) {
                for (let kx = -1; kx <= 1; kx++) {
                    const pixelIndex = ((y + ky) * width + (x + kx)) * 4;
                    const weight = kernel[ky + 1][kx + 1];
                    sumR += tempPixelArray[pixelIndex] * weight;
                    sumG += tempPixelArray[pixelIndex + 1] * weight;
                    sumB += tempPixelArray[pixelIndex + 2] * weight;
                }
            }
            const index = (y * width + x) * 4;
            pixelArray[index] = tempPixelArray[index] + factor * sumR;
            pixelArray[index + 1] = tempPixelArray[index + 1] + factor * sumG;
            pixelArray[index + 2] = tempPixelArray[index + 2] + factor * sumB;
        }
    }

    return pixelArray;
}

export default changeSharpness;
