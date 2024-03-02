function changeShadows(pixelArray, factor) {
    for (let i = 0; i < pixelArray.length / 4; i++) {
        const luminance = (pixelArray[4 * i] + pixelArray[4 * i + 1] + pixelArray[4 * i + 2]) / 3;

        if (luminance < 128) {
            pixelArray[4 * i] *= factor; 
            pixelArray[4 * i + 1] *= factor; 
            pixelArray[4 * i + 2] *= factor; 
        }
    }
    return pixelArray;
}

export default changeShadows;
