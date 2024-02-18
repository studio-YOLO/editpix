import utils from "./utils.js"
import convertToGrayScale from "./core/gray_scale.js";
import convertToBW from "./core/black_and_white.js";
import convertFromGrayToRgb from "./core/gray_to_rgb.js";
import kMeans from "./core/kmean.js";

var EditPix = function () { };

EditPix.prototype.getColorPalette = (image, colorNumber = 5, quality = 1) => {
    utils.validate(quality, colorNumber);
    const pixelArray = utils.removeAlpha(utils.getPixelArray(image));
    return kMeans(pixelArray, 10);
}

EditPix.prototype.getDominantColor = (image, quality = 1) => {
    utils.validate(quality, 1);
    image = utils.resizeByQuality(image, quality);
    const pixelArray = utils.removeAlpha(utils.getPixelArray(image));
    return kMeans(pixelArray, 1);
}

EditPix.prototype.getImageFromUrl = (url) => {
    const image = new Image();
    image.url = url;
    return image;
}

EditPix.prototype.toGrayScale = (image) => {
    const pixelArray = utils.getPixelArray(image);
    return utils.convertToImage(convertToGrayScale(pixelArray), image.naturalWidth, image.naturalHeight);
}

EditPix.prototype.fromGrayScaleToRgb = (image) => {
    const pixelArray = utils.getPixelArray(image);
    return utils.convertToImage(convertFromGrayToRgb(pixelArray), image.naturalWidth, image.naturalHeight);
}

EditPix.prototype.toBackWhite = (image) => {
    const pixelArray = utils.getPixelArray(image);
    return utils.convertToImage(convertToBW(pixelArray), image.naturalWidth, image.naturalHeight);
}

EditPix.prototype.resizeByQuality = (image, quality) => {
    return utils.resizeByQuality(image, quality);
}

EditPix.prototype.resizeByWidth = (image, widthPx) => {
    return utils.resizeByWidth(image, widthPx);
}

EditPix.prototype.resizeByHeight = (image, heightPx) => {
    return utils.resizeByWidth(image, heightPx);
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
