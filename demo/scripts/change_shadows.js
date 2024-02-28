function change_shadows(pixelArray, shadow_factor) {
    for (let i = 0; i < pixelArray.length / 4; i++) {
        const luminance = (pixelArray[4 * i] + pixelArray[4 * i + 1] + pixelArray[4 * i + 2]) / 3;

        if (luminance < 128) {
            pixelArray[4 * i] *= shadow_factor; 
            pixelArray[4 * i + 1] *= shadow_factor; 
            pixelArray[4 * i + 2] *= shadow_factor; 
        }
    }
    return pixelArray;
}

export default change_shadows;
