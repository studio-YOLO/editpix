import utils from "./utils.js"
import findMostFrequentCombination from "./color-selection.js";

var ImagePalette = function () { };

ImagePalette.prototype.getColorPalette = (image, quality, returnType) => {
    utils.validation(quality, 3, returnType)
    const pixelArray = utils.getPixelArray(image, 3, quality);
    return returnType == "rgb" ? findMostFrequentCombination(pixelArray): utils.convertRgbToHex(findMostFrequentCombination(pixelArray))
}

export default ImagePalette;