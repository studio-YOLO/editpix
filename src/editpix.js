import utils from "./utils.js"
import findMostFrequentCombination from "./color-selection.js";
import quantize from "./quantization.js";
import decript from "./decript.js"

var ImagePalette = function () { };

ImagePalette.prototype.getColorPalette = (image, colorNumber, quality, returnType) => {
    utils.validation(quality, colorNumber, returnType)
    const pixelArray = utils.getPixelArray(image, quality);
    return returnType == "rgb" ? findMostFrequentCombination(pixelArray, colorNumber): utils.convertRgbToHex(findMostFrequentCombination(pixelArray, colorNumber))
}

ImagePalette.prototype.getPixelArray = (image, quality, bitNumber) => {
    const pixelArray = utils.getPixelArray(image, quality);
    return decript(quantize(pixelArray, bitNumber))
}



export default ImagePalette;
