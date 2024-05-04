import ImageManager from "./image-manager.js";
import changeBrightness from "./core/change-brightness.js";
import changeContrast from "./core/change-contrast.js";
import changeExposure from "./core/change-exposure.js";
import changeHighlights from "./core/change-highlights.js";
import changeOpacity from "./core/change-opacity.js";
import changeSaturation from "./core/change-saturation.js";
import changeSharpness from "./core/change-sharpness.js";
import changeShadows from "./core/change-shadows.js";
import changeTemperature from "./core/change-temperature.js";
import changeTint from "./core/change-tint.js";
import higherColorContrast from "./core/higher-contrast.js";
import init, { k_means, k_means_pp, median_cut } from "./core/editpix_wasm.js";
import optimizeContrast from "./core/optimize-contrast.js";
import toBlackWhite from "./core/black-white-filter.js";
import toGrayScale from "./core/gray-scale-filter.js";
import toSepia from "./core/sepia-filter.js";
import utils from "./utils.js";
import { hexToRgb, rgbToHex, rgbToHsl, hslToRgb } from "./core/colorspace-conversion.js"

export default class EditPix {

    constructor() {
        this.imageManager = new ImageManager();
    }

    async toGrayScale(image) {
        const pixelArray = await this.imageManager.getPixelArray(image);
        const imageType = this.imageManager.getImageType(image.src);
        return this.imageManager.convertToImage(toGrayScale(pixelArray), image.naturalWidth, image.naturalHeight, imageType);
    }

    async toBackWhite(image) {
        const pixelArray = await this.imageManager.getPixelArray(image);
        const imageType = this.imageManager.getImageType(image.src);
        return this.imageManager.convertToImage(toBlackWhite(pixelArray), image.naturalWidth, image.naturalHeight, imageType);
    }

    async toSepia(image) {
        const pixelArray = await this.imageManager.getPixelArray(image);
        const imageType = this.imageManager.getImageType(image.src);
        return this.imageManager.convertToImage(toSepia(pixelArray), image.naturalWidth, image.naturalHeight, imageType);
    }

    async resizeByPercentage(image, percentage) {
            throw new Error("The percentage value is incorrect: it must be between 1 and 100");
        return this.imageManager.resizeByPercentage(image, percentage);
    }

    async resizeByWidth(image, widthPx) {
        if (widthPx < 0)
            throw new Error("The width entered is invalid: it must be positive");
        return this.imageManager.resizeByWidth(image, widthPx);
    }

    async resizeByHeight(image, heightPx) {
        if (heightPx < 0)
            throw new Error("The height entered is invalid: it must be positive");
        return this.imageManager.resizeByHeight(image, heightPx);
    }

    getHigherContrast(color) {
        return higherColorContrast(color);
    }

    rgbToHex(r, g, b) {
        if (typeof r != "number" ||
            typeof g != "number" ||
            typeof b != "number")
            throw new Error("The r, g, b type in invalid: they must be number.");
        if (r < 0 || r > 255 ||
            g < 0 || g > 255 ||
            b < 0 || b > 255)
            throw new Error("RGB format is invalid.");
        return rgbToHex(r, g, b);
    }

    hexToRgb(hexColor) {
        return hexToRgb(hexColor);
    }

    rgbToHsl(r, g, b) {
        if (typeof r != "number" ||
            typeof g != "number" ||
            typeof b != "number")
            throw new Error("The r, g, b type in invalid: they must be number.");
        if (r < 0 || r > 255 ||
            g < 0 || g > 255 ||
            b < 0 || b > 255)
            throw new Error("RGB format is invalid.");
        return rgbToHsl(r, g, b);
    }

    hslToRgb(h, s, l) {
        if (typeof h != "number" ||
            typeof s != "number" ||
            typeof l != "number")
            throw new Error("The h, s, l type in invalid: they must be number.");
        if (h < 0 || h > 360 ||
            s < 0 || s > 100 ||
            l < 0 || l > 100)
            throw new Error("HSL format is invalid.");
        return hslToRgb(h, s, l);
    }

    async toOptimizedContrast(image) {
        const pixelArray = await this.imageManager.getPixelArray(image);
        const imageType = this.imageManager.getImageType(image.src);
        return this.imageManager.convertToImage(optimizeContrast(pixelArray), image.naturalWidth, image.naturalHeight, imageType);
    }

    async changeContrast(image, factor) {
        if (factor < -100 || factor > 100)
            throw new Error("Invalid contrast factor: must be a value between -100 and 100");
        const adjustedFactor = factor / 10 + 4.8;
        const pixelArray = await this.imageManager.getPixelArray(image);
        const optimizedArray = optimizeContrast(pixelArray);
        const imageType = this.imageManager.getImageType(image.src);
        return this.imageManager.convertToImage(changeContrast(optimizedArray, adjustedFactor), image.naturalWidth, image.naturalHeight, imageType);
    }

    async changeTemperature(image, factor) {
        if (factor < -100 || factor > 100)
            throw new Error("Invalid contrast factor: must be a value between -100 and 100");
        const pixelArray = await this.imageManager.getPixelArray(image);
        const imageType = this.imageManager.getImageType(image.src);
        return this.imageManager.convertToImage(changeTemperature(pixelArray, factor), image.naturalWidth, image.naturalHeight, imageType);
    }

    async changeSaturation(image, factor) {
        if (factor < -100 || factor > 100)
            throw new Error("Invalid saturation factor: must be a value between -100 and 100");
        const pixelArray = await this.imageManager.getPixelArray(image);
        const imageType = this.imageManager.getImageType(image.src);
        return this.imageManager.convertToImage(changeSaturation(pixelArray, factor), image.naturalWidth, image.naturalHeight, imageType);

    }

    async changeBrightness(image, factor) {
        if (factor < -100 || factor > 100)
            throw new Error("Invalid brightness factor: must be a value between -100 and 100");
        const pixelArray = await this.imageManager.getPixelArray(image);
        const imageType = this.imageManager.getImageType(image.src);
        return this.imageManager.convertToImage(changeBrightness(pixelArray, factor), image.naturalWidth, image.naturalHeight, imageType);
    }

    async changeOpacity(image, alpha) {
        if (alpha < 0 || alpha > 255)
            throw new Error("Invalid alpha value: must be between 0 and 255");
        const pixelArray = await this.imageManager.getPixelArray(image);
        return this.imageManager.convertToImage(changeOpacity(pixelArray, alpha), image.naturalWidth, image.naturalHeight, "png");
    }

    async changeTint(image, factor) {
        if (factor < -100 || factor > 100)
            throw new Error("Invalid tint factor: must be a value between -100 and 100");
        const pixelArray = await this.imageManager.getPixelArray(image);
        const imageType = this.imageManager.getImageType(image.src);
        return this.imageManager.convertToImage(changeTint(pixelArray, factor), image.naturalWidth, image.naturalHeight, imageType);
    }

    async changeShadows(image, factor) {
        if (factor < -100 || factor > 100)
            throw new Error("Invalid shadow factor: must be a value between -100 and 100");
        const pixelArray = await this.imageManager.getPixelArray(image);
        const imageType = this.imageManager.getImageType(image.src);
        return this.imageManager.convertToImage(changeShadows(pixelArray, factor), image.naturalWidth, image.naturalHeight, imageType);
    }

    async changeExposure(image, factor) {
        if (factor < -100 || factor > 100)
            throw new Error("Invalid exposure factor: must be a value between -100 and 100");
        const pixelArray = await this.imageManager.getPixelArray(image);
        const imageType = this.imageManager.getImageType(image.src);
        return this.imageManager.convertToImage(changeExposure(pixelArray, factor), image.naturalWidth, image.naturalHeight, imageType);
    }

    async changeHighlights(image, factor) {
        if (factor < -100 || factor > 100)
            throw new Error("Invalid shadow factor: must be a value between -100 and 100");
        const pixelArray = await this.imageManager.getPixelArray(image);
        const imageType = this.imageManager.getImageType(image.src);
        return this.imageManager.convertToImage(changeHighlights(pixelArray, factor), image.naturalWidth, image.naturalHeight, imageType);
    }

    async changeSharpness(image, factor) {
        if (factor < -100 || factor > 100)
            throw new Error("Invalid sharpness factor: must be a value between -100 and 100");
        const pixelArray = await this.imageManager.getPixelArray(image);
        const imageType = this.imageManager.getImageType(image.src);
        return this.imageManager.convertToImage(changeSharpness(pixelArray, factor), image.naturalWidth, image.naturalHeight, imageType);
    }

    getColorPalette(image, colorNumber = 5, quality = 1) {
        return new Promise((resolve, reject) => {
            utils.validate(quality, colorNumber);
            this.imageManager.resizeByPercentage(image, quality * 10)
                .then(resizedImage => {
                    const pixelArray = utils.removeAlpha(this.imageManager.getPixelArray(resizedImage));
                    resolve(kMeans(pixelArray, colorNumber));
                })
                .catch(error => { reject(error); });
        });
    }

    async getColorPaletteWasm(image, colorNumber = 5, quality = 1, algorithm = "k-means++") {
        return new Promise((resolve, reject) => {
            utils.validate(quality, colorNumber);
            this.imageManager.resizeByPercentage(image, quality * 10)
                .then(resizedImage => {
                    const pixelArray = utils.removeAlphaSerialized(this.imageManager.getPixelArray(resizedImage));
                    if (algorithm === "k-means") {
                        init().then(() => {
                            resolve(utils.deserializeArray(k_means(pixelArray, colorNumber, 100)));
                        });
                    } else if (algorithm === "k-means++") {
                        init().then(() => {
                            resolve(utils.deserializeArray(k_means_pp(pixelArray, colorNumber, 100)));
                        });
                    } else if (algorithm === "median cut") {
                        init().then(() => {
                            resolve(utils.deserializeArray(median_cut(pixelArray, colorNumber)));
                        });
                    } else {
                        throw new Error("Non-existent algorithm.");
                    }
                }).catch(error => { reject(error); });
        });
    }

    getDominantColor(image, quality = 1) {
        return this.getColorPalette(image, 1, quality);
    }
}
