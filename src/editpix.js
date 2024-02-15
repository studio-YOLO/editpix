import utils from "./utils.js"
import convert_to_gray_scale from "./core/gray_scale.js";
import convert_to_black_and_white from "./core/colors_to_black_and_white.js";
import kMeans from "./core/kmean.js";

var EditPix = function () { };

EditPix.prototype.getColorPalette = (image, colorNumber = 5, quality = 1) => {
    utils.validate(quality, colorNumber, returnType);
    const pixelArray = utils.getPixelArray(image, quality);
    return kMeans(pixelArray, colorNumber);
}

EditPix.prototype.getDominantColor = (image, quality = 1) => {
    utils.validate(quality, colorNumber, returnType);
    const pixelArray = utils.getPixelArray(image, quality);
    return kMeans(pixelArray, 1);
}

EditPix.prototype.getImageFromUrl = (url) => {
    const image = new Image();
    image.url = url;
    return image;
}

EditPix.prototype.toGrayScale = (image) => {
    //TODO
}


EditPix.prototype.fromGrayScaleToRgb = (image) => {
    //TODO
}

EditPix.prototype.toBackWhite = (image) => {
    //TODO
}

EditPix.prototype.getHigherContrast = (color) => {
    //TODO
}

EditPix.prototype.convertToHex = (colors) => {
    return utils.rgbToHex(colors);
}

EditPix.prototype.convertToRgb = (colors) => {
    return utils.hexToRgb(colors);
}


export default EditPix;
