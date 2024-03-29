import utils from "./utils.js"
import convertToGrayScale from "./core/gray-scale-filter.js";
import convertToBW from "./core/black-white-filter.js";
import kMeans from "./core/kmean.js";
import imageManager from "./image-manager.js";
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

EditPix.prototype.getColorPaletteWasm = async (image, colorNumber = 5, quality = 1, algorithm = "k-means++") => {
    return new Promise((resolve, reject) => {
        utils.validate(quality, colorNumber);
        imageManager.resizeByPercentage(image, quality * 10)
            .then(resizedImage => {
                const pixelArray = utils.removeAlphaSerialized(imageManager.getPixelArray(resizedImage));
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
    const imageType = imageManager.getImageType(image.src);
    return imageManager.convertToImage(convertToGrayScale(pixelArray), image.naturalWidth, image.naturalHeight, imageType);
}

EditPix.prototype.toBackWhite = (image) => {
    const pixelArray = imageManager.getPixelArray(image);
    const imageType = imageManager.getImageType(image.src);
    return imageManager.convertToImage(convertToBW(pixelArray), image.naturalWidth, image.naturalHeight, imageType);
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
    const imageType = imageManager.getImageType(image.src);
    return imageManager.convertToImage(optimizeContrast(pixelArray), image.naturalWidth, image.naturalHeight, imageType);
}

EditPix.prototype.changeContrast = (image, factor) => {
    if (factor < -100 || factor > 100)
        throw new Error("Invalid contrast factor: must be a value between -100 and 100");
    const adjustedFactor = factor / 10 + 4.8;
    const pixelArray = imageManager.getPixelArray(image);
    const optimizedArray = optimizeContrast(pixelArray);
    const imageType = imageManager.getImageType(image.src);
    return imageManager.convertToImage(changeContrast(optimizedArray, adjustedFactor), image.naturalWidth, image.naturalHeight, imageType);
}

EditPix.prototype.changeTemperature = (image, factor) => {
    if (factor < -100 || factor > 100)
        throw new Error("Invalid contrast factor: must be a value between -100 and 100");
    const pixelArray = imageManager.getPixelArray(image);
    const imageType = imageManager.getImageType(image.src);
    return imageManager.convertToImage(changeTemperature(pixelArray, factor), image.naturalWidth, image.naturalHeight, imageType);
}

EditPix.prototype.changeSaturation = (image, factor) => {
    if (factor < -100 || factor > 100)
        throw new Error("Invalid saturation factor: must be a value between -100 and 100");
    const pixelArray = imageManager.getPixelArray(image);
    const imageType = imageManager.getImageType(image.src);
    return imageManager.convertToImage(changeSaturation(pixelArray, factor), image.naturalWidth, image.naturalHeight, imageType);

}

EditPix.prototype.changeBrightness = (image, factor) => {
    if (factor < -100 || factor > 100)
        throw new Error("Invalid brightness factor: must be a value between -100 and 100");
    const pixelArray = imageManager.getPixelArray(image);
    const imageType = imageManager.getImageType(image.src);
    return imageManager.convertToImage(changeBrightness(pixelArray, factor), image.naturalWidth, image.naturalHeight, imageType);
}

EditPix.prototype.rgbToHsl = (r, g, b) => {
    return utils.rgbToHsl(r, g, b);
}

EditPix.prototype.hslToRgb = (h, s, l) => {
    return utils.hslToRgb(h, s, l);
}

EditPix.prototype.toSepia = (image) => {
    const pixelArray = imageManager.getPixelArray(image);
    const imageType = imageManager.getImageType(image.src);
    return imageManager.convertToImage(toSepia(pixelArray), image.naturalWidth, image.naturalHeight, imageType);
}

EditPix.prototype.changeOpacity = (image, alpha) => {
    if (alpha < 0 || alpha > 255)
        throw new Error("Invalid alpha value: must be between 0 and 255")
    const pixelArray = imageManager.getPixelArray(image);
    return imageManager.convertToImage(changeOpacity(pixelArray, alpha), image.naturalWidth, image.naturalHeight, "png");
}

EditPix.prototype.changeTint = (image, factor) => {
    if (factor < -100 || factor > 100)
        throw new Error("Invalid tint factor: must be a value between -100 and 100");
    const pixelArray = imageManager.getPixelArray(image);
    const imageType = imageManager.getImageType(image.src);
    return imageManager.convertToImage(changeTint(pixelArray, factor), image.naturalWidth, image.naturalHeight, imageType);
}

EditPix.prototype.changeShadows = (image, factor) => {
    if (factor < -100 || factor > 100)
        throw new Error("Invalid shadow factor: must be a value between -100 and 100");
    const pixelArray = imageManager.getPixelArray(image);
    const imageType = imageManager.getImageType(image.src);
    return imageManager.convertToImage(changeShadows(pixelArray, factor), image.naturalWidth, image.naturalHeight, imageType);
}

EditPix.prototype.changeExposure = (image, factor) => {
    if (factor < -100 || factor > 100)
        throw new Error("Invalid exposure factor: must be a value between -100 and 100");
    const pixelArray = imageManager.getPixelArray(image);
    const imageType = imageManager.getImageType(image.src);
    return imageManager.convertToImage(changeExposure(pixelArray, factor), image.naturalWidth, image.naturalHeight, imageType);
}

EditPix.prototype.changeHighlights = (image, factor) => {
    if (factor < -100 || factor > 100)
        throw new Error("Invalid shadow factor: must be a value between -100 and 100");
    const pixelArray = imageManager.getPixelArray(image);
    const imageType = imageManager.getImageType(image.src);
    return imageManager.convertToImage(changeHighlights(pixelArray, factor), image.naturalWidth, image.naturalHeight, imageType);
}

EditPix.prototype.changeSharpness = (image, factor) => {
    if (factor < -100 || factor > 100)
        throw new Error("Invalid sharpness factor: must be a value between -100 and 100");
    const pixelArray = imageManager.getPixelArray(image);
    const imageType = imageManager.getImageType(image.src);
    return imageManager.convertToImage(changeSharpness(pixelArray, factor), image.naturalWidth, image.naturalHeight, imageType);
}

export default EditPix;
