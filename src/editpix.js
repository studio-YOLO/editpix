import utils from "./utils.js"
import convertToGrayScale from "./core/gray_scale.js";
import convertToBW from "./core/black_and_white.js";
import convertFromGrayToRgb from "./core/gray_to_rgb.js";
import kMeans from "./core/kmean.js";
import imageManager from "./image_manager.js";
import higherColorContrast from "./core/higher_contrast.js";
import init, { k_means } from "./core/editpix_wasm.js"
import optimizeContrast from "./core/optimize_contrast.js";
import setContrast from "./core/set_contrast.js";

var EditPix = function () { };

EditPix.prototype.getColorPalette = (image, colorNumber = 5, quality = 1) => {
    return new Promise((resolve, reject) => {
        utils.validate(quality, colorNumber);
        imageManager.resizeByPercentage(image, quality * 10)
            .then(resizedImage => {
                const pixelArray = utils.removeAlpha(imageManager.getPixelArray(resizedImage));
                resolve(kMeans(pixelArray, colorNumber));
            })
            .catch(error => { reject(error) })
    })
}

EditPix.prototype.getColorPaletteWasm = async (image, colorNumber = 5) => {
    utils.validate(1, colorNumber);
    const pixelArray = utils.removeAlphaSerialized(imageManager.getPixelArray(image));
    await init();
    let a = k_means(pixelArray, colorNumber, 100);
    return utils.deserializeArray(a);
}

EditPix.prototype.getDominantColor = function (image, quality = 1) {
    return this.getColorPalette(image, 1, quality);
}

EditPix.prototype.getImageFromUrl = (url) => {
    return new Promise((resolve, reject) => {
        const image = new Image();
        image.onload = () => { resolve(image) }
        image.onerror = (error) => { reject(error) }
        image.src = url;
    })
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

EditPix.prototype.resizeByPercentage = (image, percentage) => {
    return imageManager.resizeByPercentage(image, percentage);
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
    return Array.isArray(colors[0]) ? utils.rgbToHex(colors) : utils.rgbToHex([colors]);
}

EditPix.prototype.convertToRgb = (colors) => {
    return Array.isArray(colors) ? utils.hexToRgb(colors) : utils.hexToRgb([colors]);
}

EditPix.prototype.toOptimizedContrast = (image) => {
    const pixelArray = imageManager.getPixelArray(image);
    return imageManager.convertToImage(optimizeContrast(pixelArray), image.naturalWidth, image.naturalHeight);
}

EditPix.prototype.setContrast = (image, factor) => {
    if(factor < -100 || factor > 100)
        throw new Error("Invalid contrast factor: must be a value between -100 and 100");
    const adjustedFactor = factor/10 + 4.8;
    const pixelArray = imageManager.getPixelArray(image);
    const optimizedArray = optimizeContrast(pixelArray);
    return imageManager.convertToImage(setContrast(optimizedArray, adjustedFactor), image.naturalWidth, image.naturalHeight);
}

export default EditPix;
