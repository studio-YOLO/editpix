function change_brighness(pixelArray, brigthness_factor){
     for (let i = 0; i < pixelArray.length / 4; i++) {
            pixelArray[4 * i] += 255 * pixelArray[4 * i] 
            pixelArray[4 * i + 1] += 255  * pixelArray[4 * i + 1] 
             pixelArray[4 * i + 2] += 255 * pixelArray[4 * i + 2]
    }
    return pixelArray;
}

export default change_brighness;