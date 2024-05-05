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

/**
 * A class for editing pixel-based images.
 * @class
 * @export
 */<script type="module" src="scripts/optimize-contrast-demo.js"></script>
export default class EditPix {

    constructor() {
        this.imageManager = new ImageManager();
    }

    /**
     * Asynchronously converts an image to grayscale.
     * 
     * @param {HTMLImageElement} image - The image element to convert to grayscale.
     * @returns {Promise<HTMLImageElement>} A promise that resolves with the grayscale image element.
     * @throws {Error} Thrown if there are errors during the conversion process.
     * 
     * @description This method asynchronously converts the specified image element to grayscale.
     * 
     */
    async toGrayScale(image) {
        const pixelArray = await this.imageManager.getPixelArray(image);
        const imageType = this.imageManager.getImageType(image.src);
        return this.imageManager.convertToImage(toGrayScale(pixelArray), image.naturalWidth, image.naturalHeight, imageType);
    }

    /**
     * Asynchronously converts an image to black and white.
     * 
     * @param {HTMLImageElement} image - The image element to convert to black and white.
     * @returns {Promise<HTMLImageElement>} A promise that resolves with the black and white image element.
     * @throws {Error} Thrown if there are errors during the conversion process.
     * 
     * @description This method asynchronously converts the specified image element to black and white.
     * 
     */
    async toBackWhite(image) {
        const pixelArray = await this.imageManager.getPixelArray(image);
        const imageType = this.imageManager.getImageType(image.src);
        return this.imageManager.convertToImage(toBlackWhite(pixelArray), image.naturalWidth, image.naturalHeight, imageType);
    }

    /**
     * Asynchronously converts an image to sepia tone.
     * 
     * @param {HTMLImageElement} image - The image element to convert to sepia tone.
     * @returns {Promise<HTMLImageElement>} A promise that resolves with the sepia-toned image element.
     * @throws {Error} Thrown if there are errors during the conversion process.
     * 
     * @description This method asynchronously converts the specified image element to sepia tone.
     * 
     */
    async toSepia(image) {
        const pixelArray = await this.imageManager.getPixelArray(image);
        const imageType = this.imageManager.getImageType(image.src);
        return this.imageManager.convertToImage(toSepia(pixelArray), image.naturalWidth, image.naturalHeight, imageType);
    }

    /**
     * Asynchronously resizes an image by a specified percentage.
     * 
     * @param {HTMLImageElement} image - The image element to resize.
     * @param {number} percentage - The percentage by which to resize the image. Positive values enlarge the image, while negative values shrink it.
     * @returns {Promise<HTMLImageElement>} A promise that resolves with the resized image element.
     * @throws {Error} Thrown if there are errors during the resizing process.
     * 
     * @description This method resizes the specified image element to the given percentage. 
     * It passes the specified image and percentage to the image manager, which asynchronously resizes the image by the 
     * given percentage and returns the resized image element within a Promise.
     * 
     */
    async resizeByPercentage(image, percentage) {
        return this.imageManager.resizeByPercentage(image, percentage);
    }

    /**
     * Asynchronously resizes an image to a specified width.
     * 
     * @param {HTMLImageElement} image - The image element to resize.
     * @param {number} widthPx - The new width, in pixels, to resize the image to.
     * @returns {Promise<HTMLImageElement>} A promise that resolves with the resized image element.
     * @throws {Error} Thrown if the specified width is negative or if there are errors during the resizing process.
     * 
     * @description This method resizes the specified image element to the given width in pixels. 
     * It first checks if the specified width is negative; if so, it throws an error indicating that the width must be positive.
     * 
     */
    async resizeByWidth(image, widthPx) {
        if (typeof widthPx != "number")
            throw new Error("The height entered is invalid: it must be a number");
        if (widthPx < 0)
            throw new Error("The width entered is invalid: it must be positive");
        return this.imageManager.resizeByWidth(image, widthPx);
    }

    /**
     * Asynchronously resizes an image to a specified height.
     * 
     * @param {HTMLImageElement} image - The image element to resize.
     * @param {number} heightPx - The new height, in pixels, to resize the image to.
     * @returns {Promise<HTMLImageElement>} A promise that resolves with the resized image element.
     * @throws {Error} Thrown if the specified height is negative or if there are errors during the resizing process.
     * 
     * @description This method resizes the specified image element to the given height in pixels. 
     * It first checks if the specified height is negative; if so, it throws an error indicating that the height must be positive.
     * 
     */
    async resizeByHeight(image, heightPx) {
        if (typeof heightPx != "number")
            throw new Error("The height entered is invalid: it must be a number");
        if (heightPx < 0)
            throw new Error("The height entered is invalid: it must be positive");
        return this.imageManager.resizeByHeight(image, heightPx);
    }

    /**
     * Calculates the color with higher contrast relative to the input RGB color values.
     * 
     * @param {number} r - The red channel value (0-255).
     * @param {number} g - The green channel value (0-255).
     * @param {number} b - The blue channel value (0-255).
     * @returns {Object} An object containing the RGB values of the color with higher contrast: { r: number, g: number, b: number }).
     * @throws {Error} Thrown if the input RGB color values are invalid.
     * 
     * @description This method calculates the color with higher contrast relative to the input RGB color values. 
     * It first validates that the input RGB values are numbers within the valid range (0-255). 
     * If any of the RGB values are not numbers or fall outside the valid range, it throws an error.
     * The function returns an object representing the color with higher contrast (e.g., { r: number, g: number, b: number }).
     * 
     */
    getHigherContrast(r, g, b) {
        if (typeof r != "number" ||
            typeof g != "number" ||
            typeof b != "number")
            throw new Error("The r, g, b type in invalid: they must be number.");
        if (r < 0 || r > 255 ||
            g < 0 || g > 255 ||
            b < 0 || b > 255)
            throw new Error("RGB format is invalid.");
        return higherColorContrast(r, g, b);
    }

    /**
     * Converts RGB color values to a hexadecimal color representation.
     * 
     * @param {number} r - The red channel value (0-255).
     * @param {number} g - The green channel value (0-255).
     * @param {number} b - The blue channel value (0-255).
     * @returns {string} The hexadecimal representation of the RGB color with the format "#RRGGBB".
     * @throws {Error} Thrown if the input RGB color values are invalid.
     * 
     * @description This method converts the specified RGB color values to a hexadecimal color representation. 
     * It first validates that the input RGB values are numbers within the valid range (0-255). 
     * If any of the RGB values are not numbers or fall outside the valid range, it throws an error.
     * The function returns the hexadecimal representation of the RGB color with the format "#RRGGBB".
     * 
     */
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

    /**
     * Converts a hexadecimal color representation to RGB color values.
     * 
     * @param {string} hexColor - The hexadecimal color representation (e.g., "#RRGGBB" or "#RGB").
     * @returns {object} An object containing the RGB representation: { r: number, g: number, b: number }.
     * @throws {Error} Thrown if the input hexadecimal color representation is invalid.
     * 
     * @description This method converts the specified hexadecimal color representation to RGB color values. 
     * It delegates the conversion to the `hexToRgb` function, passing the hexadecimal color representation. 
     * The function returns an object containing the red, green, and blue channel values extracted from the hexadecimal color (e.g., { r: number, g: number, b: number }). 
     * If the input hexadecimal color representation is invalid, it throws an error.
     * 
     */
    hexToRgb(hexColor) {
        return hexToRgb(hexColor);
    }

    /**
     * Converts RGB color values to HSL (Hue, Saturation, Lightness) color representation.
     * 
     * @param {number} r - The red channel value (0-255).
     * @param {number} g - The green channel value (0-255).
     * @param {number} b - The blue channel value (0-255).
     * @returns {object} An object containing the HSL representation: { h: number, s: number, l: number }.
     * @throws {Error} Thrown if the input RGB color values are invalid.
     * 
     * @description This method converts the specified RGB color values to HSL (Hue, Saturation, Lightness) color representation. 
     * It first validates that the input RGB values are numbers within the valid range (0-255). 
     * If any of the RGB values are not numbers or fall outside the valid range, it throws an error.
     * The function returns an object containing the HSL representation with the hue (h), saturation (s), and lightness (l) values.
     * 
     */
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

    /**
     * Converts HSL (Hue, Saturation, Lightness) color values to RGB color representation.
     * 
     * @param {number} h - The hue value (0-360).
     * @param {number} s - The saturation value (0-100).
     * @param {number} l - The lightness value (0-100).
     * @returns {object} An object containing the RGB representation: { r: number, g: number, b: number }.
     * @throws {Error} Thrown if the input HSL color values are invalid.
     * 
     * @description This method converts the specified HSL (Hue, Saturation, Lightness) color values to RGB color representation. 
     * It first validates that the input HSL values are numbers within the valid range (hue: 0-360, saturation: 0-100, lightness: 0-100). 
     * If any of the HSL values are not numbers or fall outside the valid range, it throws an error.
     * The function returns an object containing the RGB representation with the red (r), green (g), and blue (b) channel values.
     * 
     */
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

    /**
     * Asynchronously converts an image to optimized contrast.
     * 
     * @param {HTMLImageElement} image - The image element to convert to optimized contrast.
     * @returns {Promise<HTMLImageElement>} A promise that resolves with the image element containing optimized contrast.
     * @throws {Error} Thrown if there are errors during the conversion process.
     * 
     * @description This method asynchronously converts the specified image element to optimized contrast.
     * 
     */
    async toOptimizedContrast(image) {
        const pixelArray = await this.imageManager.getPixelArray(image);
        const imageType = this.imageManager.getImageType(image.src);
        return this.imageManager.convertToImage(optimizeContrast(pixelArray), image.naturalWidth, image.naturalHeight, imageType);
    }

    /**
     * Asynchronously changes the contrast of an image.
     * 
     * @param {HTMLImageElement} image - The image element to change the contrast of.
     * @param {number} factor - The contrast adjustment factor (-100 to 100).
     * @returns {Promise<HTMLImageElement>} A promise that resolves with the image element with adjusted contrast.
     * @throws {Error} Thrown if the specified contrast factor is outside the valid range.
     * 
     * @description This method asynchronously changes the contrast of the specified image element by applying a contrast adjustment factor. 
     * The contrast adjustment factor determines the steepness of the contrast curve. 
     * The factor should be in the range of -100 to 100, where negative values decrease contrast and positive values increase contrast. 
     * If factor value are not numbers or fall outside the valid range, it throws an error.
     * 
     */
    async changeContrast(image, factor) {
        if (typeof factor != "number")
            throw new Error("The factor value entered is invalid: it must be a number");
        if (factor < -100 || factor > 100)
            throw new Error("Invalid contrast factor: must be a value between -100 and 100");
        const adjustedFactor = factor / 10 + 4.8;
        const pixelArray = await this.imageManager.getPixelArray(image);
        const optimizedArray = optimizeContrast(pixelArray);
        const imageType = this.imageManager.getImageType(image.src);
        return this.imageManager.convertToImage(changeContrast(optimizedArray, adjustedFactor), image.naturalWidth, image.naturalHeight, imageType);
    }

    /**
     * Asynchronously changes the temperature of an image.
     * 
     * @param {HTMLImageElement} image - The image element to change the temperature of.
     * @param {number} factor - The temperature adjustment factor (-100 to 100).
     * @returns {Promise<HTMLImageElement>} A promise that resolves with the image element with adjusted temperature.
     * @throws {Error} Thrown if the specified temperature factor is outside the valid range.
     * 
     * @description This method asynchronously changes the temperature of the specified image element by applying a temperature adjustment factor.
     * The temperature adjustment factor determines the direction and intensity of the temperature change. 
     * A negative factor shifts the image towards cooler tones, while a positive factor shifts it towards warmer tones. 
     * The factor should be in the range of -100 to 100. 
     * If factor value are not numbers or fall outside the valid range, it throws an error. 
     * 
     */
    async changeTemperature(image, factor) {
        if (typeof factor != "number")
            throw new Error("The factor value entered is invalid: it must be a number");
        if (factor < -100 || factor > 100)
            throw new Error("Invalid contrast factor: must be a value between -100 and 100");
        const pixelArray = await this.imageManager.getPixelArray(image);
        const imageType = this.imageManager.getImageType(image.src);
        return this.imageManager.convertToImage(changeTemperature(pixelArray, factor), image.naturalWidth, image.naturalHeight, imageType);
    }

    /**
     * Asynchronously changes the saturation of an image.
     * 
     * @param {HTMLImageElement} image - The image element to change the saturation of.
     * @param {number} factor - The saturation adjustment factor (-100 to 100).
     * @returns {Promise<HTMLImageElement>} A promise that resolves with the image element with adjusted saturation.
     * @throws {Error} Thrown if the specified saturation factor is outside the valid range.
     * 
     * @description This method asynchronously changes the saturation of the specified image element by applying a saturation adjustment factor. 
     * The saturation adjustment factor determines the intensity of the saturation change. 
     * A negative factor decreases saturation, while a positive factor increases saturation. 
     * The factor should be in the range of -100 to 100.
     * If factor value are not numbers or fall outside the valid range, it throws an error.
     * 
     */
    async changeSaturation(image, factor) {
        if (typeof factor != "number")
            throw new Error("The factor value entered is invalid: it must be a number");
        if (factor < -100 || factor > 100)
            throw new Error("Invalid saturation factor: must be a value between -100 and 100");
        const pixelArray = await this.imageManager.getPixelArray(image);
        const imageType = this.imageManager.getImageType(image.src);
        return this.imageManager.convertToImage(changeSaturation(pixelArray, factor), image.naturalWidth, image.naturalHeight, imageType);
    }

    /**
     * Asynchronously changes the brightness of an image.
     * 
     * @param {HTMLImageElement} image - The image element to change the brightness of.
     * @param {number} factor - The brightness adjustment factor (-100 to 100).
     * @returns {Promise<HTMLImageElement>} A promise that resolves with the image element with adjusted brightness.
     * @throws {Error} Thrown if the specified brightness factor is outside the valid range.
     * 
     * @description This method asynchronously changes the brightness of the specified image element by applying a brightness adjustment factor. 
     * The brightness adjustment factor determines the intensity of the brightness change. 
     * A negative factor decreases brightness, while a positive factor increases brightness. 
     * The factor should be in the range of -100 to 100. 
     * If factor value are not numbers or fall outside the valid range, it throws an error.
     * 
     */
    async changeBrightness(image, factor) {
        if (typeof factor != "number")
            throw new Error("The factor value entered is invalid: it must be a number");
        if (factor < -100 || factor > 100)
            throw new Error("Invalid brightness factor: must be a value between -100 and 100");
        const pixelArray = await this.imageManager.getPixelArray(image);
        const imageType = this.imageManager.getImageType(image.src);
        return this.imageManager.convertToImage(changeBrightness(pixelArray, factor), image.naturalWidth, image.naturalHeight, imageType);
    }

    /**
     * Asynchronously changes the opacity of an image.
     * 
     * @param {HTMLImageElement} image - The image element to change the opacity of.
     * @param {number} alpha - The new alpha value (opacity) to set for all pixels (0 to 255).
     * @returns {Promise<HTMLImageElement>} A promise that resolves with the image element with adjusted opacity.
     * @throws {Error} Thrown if the specified alpha value is outside the valid range.
     * 
     * @description This method asynchronously changes the opacity of the specified image element by setting the alpha channel (transparency) to a specified value for all pixels. 
     * The alpha value should be in the range of 0 to 255, where 0 represents fully transparent and 255 represents fully opaque. 
     * If alpha value are not numbers or fall outside the valid range, it throws an error.
     * 
     */
    async changeOpacity(image, alpha) {
        if (typeof alpha != "number")
            throw new Error("The alpha value entered is invalid: it must be a number");
        if (alpha < 0 || alpha > 255)
            throw new Error("Invalid alpha value: must be between 0 and 255");
        const pixelArray = await this.imageManager.getPixelArray(image);
        return this.imageManager.convertToImage(changeOpacity(pixelArray, alpha), image.naturalWidth, image.naturalHeight, "png");
    }

    /**
     * Asynchronously changes the tint of an image.
     * 
     * @param {HTMLImageElement} image - The image element to change the tint of.
     * @param {number} factor - The tint adjustment factor (-100 to 100).
     * @returns {Promise<HTMLImageElement>} A promise that resolves with the image element with adjusted tint.
     * @throws {Error} Thrown if the specified tint factor is outside the valid range.
     * 
     * @description This method asynchronously changes the tint of the specified image element by adjusting the green channel (G) value based on the specified tint adjustment factor. 
     * The tint adjustment factor should be in the range of -100 to 100. 
     * A positive factor increases the green channel (making the image more green), while a negative factor decreases the green channel (making the image less green). 
     * If factor value are not numbers or fall outside the valid range, it throws an error.
     * 
     */
    async changeTint(image, factor) {
        if (typeof factor != "number")
            throw new Error("The factor value entered is invalid: it must be a number");
        if (factor < -100 || factor > 100)
            throw new Error("Invalid tint factor: must be a value between -100 and 100");
        const pixelArray = await this.imageManager.getPixelArray(image);
        const imageType = this.imageManager.getImageType(image.src);
        return this.imageManager.convertToImage(changeTint(pixelArray, factor), image.naturalWidth, image.naturalHeight, imageType);
    }

    /**
     * Asynchronously changes the shadows of an image.
     * 
     * @param {HTMLImageElement} image - The image element to change the shadows of.
     * @param {number} factor - The shadow adjustment factor (-100 to 100).
     * @returns {Promise<HTMLImageElement>} A promise that resolves with the image element with adjusted shadows.
     * @throws {Error} Thrown if the specified shadow factor is outside the valid range.
     * 
     * @description This method asynchronously changes the shadows of the specified image element by adjusting the RGB values of pixels with a luminance below 128. 
     * The shadow adjustment factor determines the intensity of the shadow adjustment applied to those pixels. 
     * A positive factor increases the darkness of shadows, while a negative factor lightens shadows. 
     * The factor should be in the range of -100 to 100. 
     * If factor value are not numbers or fall outside the valid range, it throws an error.
     * 
     */
    async changeShadows(image, factor) {
        if (typeof factor != "number")
            throw new Error("The factor value entered is invalid: it must be a number");
        if (factor < -100 || factor > 100)
            throw new Error("Invalid shadow factor: must be a value between -100 and 100");
        const pixelArray = await this.imageManager.getPixelArray(image);
        const imageType = this.imageManager.getImageType(image.src);
        return this.imageManager.convertToImage(changeShadows(pixelArray, factor), image.naturalWidth, image.naturalHeight, imageType);
    }

    /**
     * Asynchronously changes the exposure of an image.
     * 
     * @param {HTMLImageElement} image - The image element to change the exposure of.
     * @param {number} factor - The exposure adjustment factor (-100 to 100).
     * @returns {Promise<HTMLImageElement>} A promise that resolves with the image element with adjusted exposure.
     * @throws {Error} Thrown if the specified exposure factor is outside the valid range.
     * 
     * @description This method asynchronously changes the exposure of the specified image element by applying an exposure adjustment factor to each RGB channel of every pixel. 
     * The exposure adjustment factor determines the intensity of the exposure adjustment. 
     * A positive factor increases the brightness of the image, while a negative factor decreases the brightness. 
     * The factor should be in the range of -100 to 100. 
     * If factor value are not numbers or fall outside the valid range, it throws an error.
     * 
     */
    async changeExposure(image, factor) {
        if (typeof factor != "number")
            throw new Error("The factor value entered is invalid: it must be a number");
        if (factor < -100 || factor > 100)
            throw new Error("Invalid exposure factor: must be a value between -100 and 100");
        const pixelArray = await this.imageManager.getPixelArray(image);
        const imageType = this.imageManager.getImageType(image.src);
        return this.imageManager.convertToImage(changeExposure(pixelArray, factor), image.naturalWidth, image.naturalHeight, imageType);
    }

    /**
     * Asynchronously changes the highlights of an image.
     * 
     * @param {HTMLImageElement} image - The image element to change the highlights of.
     * @param {number} factor - The highlights adjustment factor (-100 to 100).
     * @returns {Promise<HTMLImageElement>} A promise that resolves with the image element with adjusted highlights.
     * @throws {Error} Thrown if the specified highlights factor is outside the valid range.
     * 
     * @description This method asynchronously changes the highlights of the specified image element by adjusting the RGB values of pixels with a luminance above 128. 
     * The highlights adjustment factor determines the intensity of the highlights adjustment applied to those pixels. 
     * A positive factor increases the brightness of highlights, while a negative factor decreases the brightness. 
     * The factor should be in the range of -100 to 100. 
     * If factor value are not numbers or fall outside the valid range, it throws an error.
     * 
     */
    async changeHighlights(image, factor) {
        if (typeof factor != "number")
            throw new Error("The factor value entered is invalid: it must be a number");
        if (factor < -100 || factor > 100)
            throw new Error("Invalid shadow factor: must be a value between -100 and 100");
        const pixelArray = await this.imageManager.getPixelArray(image);
        const imageType = this.imageManager.getImageType(image.src);
        return this.imageManager.convertToImage(changeHighlights(pixelArray, factor), image.naturalWidth, image.naturalHeight, imageType);
    }

    /**
     * Asynchronously changes the sharpness of an image.
     * 
     * @param {HTMLImageElement} image - The image element to change the sharpness of.
     * @param {number} factor - The sharpness adjustment factor (-100 to 100).
     * @returns {Promise<HTMLImageElement>} A promise that resolves with the image element with adjusted sharpness.
     * @throws {Error} Thrown if the specified sharpness factor is outside the valid range.
     * 
     * @description This method asynchronously changes the sharpness of the specified image element by applying convolution with a sharpening kernel. 
     * The sharpness adjustment factor determines the intensity of the sharpening effect. 
     * A positive factor increases sharpness, while a negative factor decreases sharpness. 
     * The factor should be in the range of -100 to 100. 
     * If factor value are not numbers or fall outside the valid range, it throws an error.
     * 
     */
    async changeSharpness(image, factor) {
        if (typeof factor != "number")
            throw new Error("The factor value entered is invalid: it must be a number");
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
