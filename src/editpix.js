import utils from "./utils.js"
import convertToGrayScale from "./core/gray-scale-filter.js";
import convertToBW from "./core/black-white-filter.js";
import kMeans from "./core/kmean.js";
import ImageManager from "./image-manager.js";
import higherColorContrast from "./core/higher-contrast.js";
import init, { k_means, k_means_pp, median_cut } from "./core/editpix_wasm.js"
import optimizeContrast from "./core/optimize-contrast.js";
import changeContrast from "./core/change-contrast.js";
import changeTemperature from "./core/change-temperature.js";
import changeSaturation from "./core/change-saturation.js";
import changeBrightness from "./core/change-brightness.js";
import toSepia from "./core/sepia-filter.js";
import changeOpacity from "./core/change-opacity.js";
import changeShadows from "./core/change-shadows.js";
import changeExposure from "./core/change-exposure.js";
import changeTint from "./core/change-tint.js"
import changeHighlights from "./core/change-highlights.js";
import changeSharpness from "./core/change-sharpness.js";

const EditPix = function () {
    this.imageManager = new ImageManager();
};

EditPix.prototype.getColorPalette = (image, colorNumber = 5, quality = 1) => {
    return new Promise((resolve, reject) => {
        utils.validate(quality, colorNumber);
        this.imageManager.resizeByPercentage(image, quality * 10)
            .then(resizedImage => {
                const pixelArray = utils.removeAlpha(this.imageManager.getPixelArray(resizedImage));
                resolve(kMeans(pixelArray, colorNumber));
            })
            .catch(error => { reject(error) })
    })
}

EditPix.prototype.getColorPaletteWasm = async (image, colorNumber = 5, quality = 1, algorithm = "k-means++") => {
    return new Promise((resolve, reject) => {
        utils.validate(quality, colorNumber);
        this.imageManager.resizeByPercentage(image, quality * 10)
            .then(resizedImage => {
                const pixelArray = utils.removeAlphaSerialized(this.imageManager.getPixelArray(resizedImage));
                if (algorithm === "k-means") {
                    init().then(() => {
                        resolve(utils.deserializeArray(k_means(pixelArray, colorNumber, 100)));
                    })
                } else if (algorithm === "k-means++") {
                    init().then(() => {
                        resolve(utils.deserializeArray(k_means_pp(pixelArray, colorNumber, 100)));
                    })
                } else if (algorithm === "median cut") {
                    init().then(() => {
                        resolve(utils.deserializeArray(median_cut(pixelArray, colorNumber)));
                    })
                } else {
                    throw new Error("Non-existent algorithm.");
                }
            }).catch(error => { reject(error) })
    })
}

EditPix.prototype.getDominantColor = function (image, quality = 1) {
    return this.getColorPalette(image, 1, quality);
}

EditPix.prototype.toGrayScale = async function (image) {
    const pixelArray = await this.imageManager.getPixelArray(image);
    const imageType = this.imageManager.getImageType(image.src);
    return this.imageManager.convertToImage(convertToGrayScale(pixelArray), image.naturalWidth, image.naturalHeight, imageType);
}

EditPix.prototype.toBackWhite = async function (image) {
    const pixelArray = await this.imageManager.getPixelArray(image);
    const imageType = this.imageManager.getImageType(image.src);
    return this.imageManager.convertToImage(convertToBW(pixelArray), image.naturalWidth, image.naturalHeight, imageType);
}

EditPix.prototype.toSepia = async function (image) {
    const pixelArray = await this.imageManager.getPixelArray(image);
    const imageType = this.imageManager.getImageType(image.src);
    return this.imageManager.convertToImage(toSepia(pixelArray), image.naturalWidth, image.naturalHeight, imageType);
}

EditPix.prototype.resizeByPercentage = async function (image, percentage) {
    if (percentage < 1 || percentage > 100)
        throw new Error("The percentage value is incorrect: it must be between 1 and 100");
    return this.imageManager.resizeByPercentage(image, percentage);
}

EditPix.prototype.resizeByWidth = async function (image, widthPx) {
    if (widthPx < 0)
        throw new Error("The width entered is invalid: it must be positive");
    return this.imageManager.resizeByWidth(image, widthPx);
}

EditPix.prototype.resizeByHeight = async function (image, heightPx) {
    if (heightPx < 0)
        throw new Error("The height entered is invalid: it must be positive");
    return this.imageManager.resizeByHeight(image, heightPx);
}

EditPix.prototype.getHigherContrast = function (color) {
    return higherColorContrast(color);
}

EditPix.prototype.rgbToHex = function (r, g, b) {
    if (typeof r != "number" ||
        typeof g != "number" ||
        typeof b != "number")
        throw new Error("The r, g, b type in invalid: they must be number.");
    if (r < 0 || r > 255 ||
        g < 0 || g > 255 ||
        b < 0 || b > 255)
        throw new Error("RGB format is invalid.");
    return utils.rgbToHex(r, g, b);
}

EditPix.prototype.hexToRgb = function (hexColor) {
    return utils.hexToRgb(hexColor);
}

EditPix.prototype.rgbToHsl = function (r, g, b) {
    if (typeof r != "number" ||
        typeof g != "number" ||
        typeof b != "number")
        throw new Error("The r, g, b type in invalid: they must be number.");
    if (r < 0 || r > 255 ||
        g < 0 || g > 255 ||
        b < 0 || b > 255)
        throw new Error("RGB format is invalid.");
    return utils.rgbToHsl(r, g, b);
}

EditPix.prototype.hslToRgb = function (h, s, l) {
    if (typeof h != "number" ||
        typeof s != "number" ||
        typeof l != "number")
        throw new Error("The h, s, l type in invalid: they must be number.");
    if (h < 0 || h > 360 ||
        s < 0 || s > 100 ||
        l < 0 || l > 100)
        throw new Error("HSL format is invalid.");
    return utils.hslToRgb(h, s, l);
}

EditPix.prototype.toOptimizedContrast = async function (image) {
    const pixelArray = await this.imageManager.getPixelArray(image);
    const imageType = this.imageManager.getImageType(image.src);
    return this.imageManager.convertToImage(optimizeContrast(pixelArray), image.naturalWidth, image.naturalHeight, imageType);
}

EditPix.prototype.changeContrast = async function (image, factor) {
    if (factor < -100 || factor > 100)
        throw new Error("Invalid contrast factor: must be a value between -100 and 100");
    const adjustedFactor = factor / 10 + 4.8;
    const pixelArray = await this.imageManager.getPixelArray(image);
    const optimizedArray = optimizeContrast(pixelArray);
    const imageType = this.imageManager.getImageType(image.src);
    return this.imageManager.convertToImage(changeContrast(optimizedArray, adjustedFactor), image.naturalWidth, image.naturalHeight, imageType);
}

EditPix.prototype.changeTemperature = async function (image, factor) {
    if (factor < -100 || factor > 100)
        throw new Error("Invalid contrast factor: must be a value between -100 and 100");
    const pixelArray = await this.imageManager.getPixelArray(image);
    const imageType = this.imageManager.getImageType(image.src);
    return this.imageManager.convertToImage(changeTemperature(pixelArray, factor), image.naturalWidth, image.naturalHeight, imageType);
}

EditPix.prototype.changeSaturation = async function (image, factor) {
    if (factor < -100 || factor > 100)
        throw new Error("Invalid saturation factor: must be a value between -100 and 100");
    const pixelArray = await this.imageManager.getPixelArray(image);
    const imageType = this.imageManager.getImageType(image.src);
    return this.imageManager.convertToImage(changeSaturation(pixelArray, factor), image.naturalWidth, image.naturalHeight, imageType);

}

EditPix.prototype.changeBrightness = async function (image, factor) {
    if (factor < -100 || factor > 100)
        throw new Error("Invalid brightness factor: must be a value between -100 and 100");
    const pixelArray = await this.imageManager.getPixelArray(image);
    const imageType = this.imageManager.getImageType(image.src);
    return this.imageManager.convertToImage(changeBrightness(pixelArray, factor), image.naturalWidth, image.naturalHeight, imageType);
}

EditPix.prototype.changeOpacity = async function (image, alpha) {
    if (alpha < 0 || alpha > 255)
        throw new Error("Invalid alpha value: must be between 0 and 255")
    const pixelArray = await this.imageManager.getPixelArray(image);
    return this.imageManager.convertToImage(changeOpacity(pixelArray, alpha), image.naturalWidth, image.naturalHeight, "png");
}

EditPix.prototype.changeTint = async function (image, factor) {
    if (factor < -100 || factor > 100)
        throw new Error("Invalid tint factor: must be a value between -100 and 100");
    const pixelArray = await this.imageManager.getPixelArray(image);
    const imageType = this.imageManager.getImageType(image.src);
    return this.imageManager.convertToImage(changeTint(pixelArray, factor), image.naturalWidth, image.naturalHeight, imageType);
}

EditPix.prototype.changeShadows = async function (image, factor) {
    if (factor < -100 || factor > 100)
        throw new Error("Invalid shadow factor: must be a value between -100 and 100");
    const pixelArray = await this.imageManager.getPixelArray(image);
    const imageType = this.imageManager.getImageType(image.src);
    return this.imageManager.convertToImage(changeShadows(pixelArray, factor), image.naturalWidth, image.naturalHeight, imageType);
}

EditPix.prototype.changeExposure = async function (image, factor) {
    if (factor < -100 || factor > 100)
        throw new Error("Invalid exposure factor: must be a value between -100 and 100");
    const pixelArray = await this.imageManager.getPixelArray(image);
    const imageType = this.imageManager.getImageType(image.src);
    return this.imageManager.convertToImage(changeExposure(pixelArray, factor), image.naturalWidth, image.naturalHeight, imageType);
}

EditPix.prototype.changeHighlights = async function (image, factor) {
    if (factor < -100 || factor > 100)
        throw new Error("Invalid shadow factor: must be a value between -100 and 100");
    const pixelArray = await this.imageManager.getPixelArray(image);
    const imageType = this.imageManager.getImageType(image.src);
    return this.imageManager.convertToImage(changeHighlights(pixelArray, factor), image.naturalWidth, image.naturalHeight, imageType);
}

EditPix.prototype.changeSharpness = async function (image, factor) {
    if (factor < -100 || factor > 100)
        throw new Error("Invalid sharpness factor: must be a value between -100 and 100");
    const pixelArray = await this.imageManager.getPixelArray(image);
    const imageType = this.imageManager.getImageType(image.src);
    return this.imageManager.convertToImage(changeSharpness(pixelArray, factor), image.naturalWidth, image.naturalHeight, imageType);
}

export default EditPix;
