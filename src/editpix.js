import utils from "./utils.js"
import convertToGrayScale from "./core/gray_scale.js";
import convertToBW from "./core/black_and_white.js";
import convertFromGrayToRgb from "./core/gray_to_rgb.js";
import kMeans from "./core/kmean.js";
import imageManager from "./image_manager.js";
import higherColorContrast from "./core/higher_contrast.js";
import init, { k_means } from "./core/editpix_wasm.js"

var EditPix = function () { };

EditPix.prototype.getColorPalette = (image, colorNumber = 5, quality = 1) => {
    utils.validate(quality, colorNumber);
    const pixelArray = utils.removeAlpha(imageManager.getPixelArray(image));
    return kMeans(pixelArray, 10);
}

EditPix.prototype.getColorPaletteWasm = async (image, colorNumber = 5, quality = 1) => {
    utils.validate(quality, colorNumber);
    const pixelArray = utils.removeAlphaSerialized(imageManager.getPixelArray(image));
    await init();
    let a = k_means(pixelArray, colorNumber, quality * 10);
    return utils.deserializeArray(a);
}

EditPix.prototype.getDominantColor = (image, quality = 1) => {
    utils.validate(quality, 1);
    image = imageManager.resizeByQuality(image, quality);
    const pixelArray = utils.removeAlpha(imageManager.getPixelArray(image));
    return kMeans(pixelArray, 1);
}

EditPix.prototype.getImageFromUrl = (url) => {
    const image = new Image();
    image.url = url;
    return image;
}

EditPix.prototype.toGrayScale = (image) => {
    const pixelArray = imageManager.getPixelArray(image);
    return imageManager.convertToImage(convertToGrayScale(pixelArray), image.naturalWidth, image.naturalHeight);
}

EditPix.prototype.fromGrayScaleToRgb = (image) => {
    const pixelArray = imageManager.getPixelArray(image);
    return imageManager.convertToImage(convertFromGrayToRgb(pixelArray), image.naturalWidth, image.naturalHeight);
}

EditPix.prototype.toBackWhite = (image) => {
    const pixelArray = imageManager.getPixelArray(image);
    return imageManager.convertToImage(convertToBW(pixelArray), image.naturalWidth, image.naturalHeight);
}

EditPix.prototype.resizeByQuality = (image, quality) => {
    return imageManager.resizeByQuality(image, quality);
}

EditPix.prototype.resizeByWidth = (image, widthPx) => {
    return imageManager.resizeByWidth(image, widthPx);
}

EditPix.prototype.resizeByHeight = (image, heightPx) => {
    return imageManager.resizeByHeight(image, heightPx);
}

EditPix.prototype.getHigherContrast = (color) => {
    return higherColorContrast(color);
}

EditPix.prototype.convertToHex = (colors) => {
    return utils.rgbToHex(colors);
}

EditPix.prototype.convertToRgb = (colors) => {
    return utils.hexToRgb(colors);
}

export default EditPix;
