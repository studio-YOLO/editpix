/**
 * A class for managing image processing operations.
 * @class
 * @export
 */
export default class ImageManager {

    /**
     * Creates a new instance of a canvas utility object.
     * 
     * @constructor
     * 
     * @description This constructor initializes a new canvas utility object. 
     * It creates a <canvas> element and a 2D rendering context associated with it. 
     * The 'willReadFrequently' option is set to 'true' for performance optimization, 
     * indicating that frequent reads will be made from the context.
     * 
     */
    constructor() {
        this.canvas = document.createElement("canvas");
        this.context = this.canvas.getContext("2d", { willReadFrequently: true });
    }

    /**
     * Asynchronously retrieves the pixel array data of an image.
     * 
     * @param {HTMLImageElement} image - The image or canvas element from which to extract pixel data.
     * @returns {Uint8ClampedArray} The pixel array data of the image, representing the RGBA values for each pixel.
     * @throws {DOMException} Thrown if there are errors accessing or processing the image.
     * 
     * @description This method asynchronously retrieves the pixel array data of the specified image or canvas element. 
     * It first creates an ImageBitmap from the given image source using `createImageBitmap` to ensure efficient rendering and manipulation. 
     * Then, it adjusts the dimensions of the canvas to match the dimensions of the ImageBitmap, draws the ImageBitmap onto the canvas, 
     * and retrieves the pixel data using `getImageData`. 
     * Finally, it returns the pixel array data, which represents the RGBA values (red, green, blue, and alpha transparency) for each pixel in the image.
     * 
     */
    async getPixelArray(image) {
        const bitmap = await createImageBitmap(image);
        this.canvas.width = bitmap.width;
        this.canvas.height = bitmap.height;
        this.context.drawImage(bitmap, 0, 0);
        return this.context.getImageData(0, 0, bitmap.width, bitmap.height).data;
    }

    /**
     * Asynchronously resizes an image by a specified percentage.
     * 
     * @param {HTMLImageElement} image - The image element to resize.
     * @param {number} percentage - The percentage by which to resize the image. Positive values enlarge the image, while negative values shrink it.
     * @returns {Promise<HTMLImageElement>} A promise that resolves with the resized image element.
     * @throws {Error} Thrown if there are errors during the resizing process.
     * 
     * @description This method resizes the specified image element by the given percentage. 
     * It calculates the new width and height of the image based on the provided percentage, adjusts the dimensions of the canvas accordingly, 
     * draws the resized image onto the canvas, and converts the canvas content back to an image blob. 
     * Finally, it creates a new image element with the resized image data and returns it asynchronously within a Promise.
     * 
     */
    async resizeByPercentage(image, percentage) {
        const newWidth = image.naturalWidth + image.naturalWidth * (percentage / 100);
        const newHeight = image.naturalHeight + image.naturalHeight * (percentage / 100);
        this.canvas.width = newWidth;
        this.canvas.height = newHeight;
        this.context.drawImage(image, 0, 0, newWidth, newHeight);
        return new Promise((resolve, reject) => {
            this.canvas.toBlob((blob) => {
                const image = new Image();
                image.onload = () => { resolve(image); };
                image.onerror = (error) => { reject(error); };
                image.src = URL.createObjectURL(blob);
            }, "image/" + this.getImageType(image.src));
        });
    }

    /**
     * Asynchronously resizes an image to a new width while maintaining aspect ratio.
     * 
     * @param {HTMLImageElement} image - The image element to resize.
     * @param {number} newWidth - The new width to resize the image to.
     * @returns {Promise<HTMLImageElement>} A promise that resolves with the resized image element.
     * @throws {Error} Thrown if there are errors during the resizing process.
     * 
     * @description This method resizes the specified image element to the given new width while preserving its aspect ratio. 
     * It calculates the corresponding height based on the aspect ratio of the original image, adjusts the dimensions of the
     * canvas accordingly, draws the resized image onto the canvas, and converts the canvas content back to an image blob. 
     * Finally, it creates a new image element with the resized image data and returns it asynchronously within a Promise.
     * 
     */
    async resizeByWidth(image, newWidth) {
        const newHeight = image.naturalHeight * (newWidth / image.naturalWidth);
        this.canvas.width = newWidth;
        this.canvas.height = newHeight;
        this.context.drawImage(image, 0, 0, newWidth, newHeight);
        return new Promise((resolve, reject) => {
            this.canvas.toBlob((blob) => {
                const image = new Image();
                image.onload = () => { resolve(image); };
                image.onerror = (error) => { reject(error); };
                image.src = URL.createObjectURL(blob);
            }, "image/" + this.getImageType(image.src));
        });
    }

    /**
     * Asynchronously resizes an image to a new height while maintaining aspect ratio.
     * 
     * @param {HTMLImageElement} image - The image element to resize.
     * @param {number} newHeight - The new height to resize the image to.
     * @returns {Promise<HTMLImageElement>} A promise that resolves with the resized image element.
     * @throws {Error} Thrown if there are errors during the resizing process.
     * 
     * @description This method resizes the specified image element to the given new height while preserving its aspect ratio.
     * It calculates the corresponding width based on the aspect ratio of the original image, adjusts the dimensions of the 
     * canvas accordingly, draws the resized image onto the canvas, and converts the canvas content back to an image blob. 
     * Finally, it creates a new image element with the resized image data and returns it asynchronously within a Promise.
     * 
     */
    async resizeByHeight(image, newHeight) {
        const newWidth = image.naturalWidth * (newHeight / image.naturalHeight);
        this.canvas.width = newWidth;
        this.canvas.height = newHeight;
        this.context.drawImage(image, 0, 0, newWidth, newHeight);
        return new Promise((resolve, reject) => {
            this.canvas.toBlob((blob) => {
                const image = new Image();
                image.onload = () => { resolve(image); };
                image.onerror = (error) => { reject(error); };
                image.src = URL.createObjectURL(blob);
            }, "image/" + this.getImageType(image.src));
        });
    }

    /**
     * Asynchronously converts pixel array data to an image.
     * 
     * @param {Uint8ClampedArray} pixelArray - The pixel array data representing the RGBA values for each pixel.
     * @param {number} width - The width of the image.
     * @param {number} height - The height of the image.
     * @param {string} type - The type of the image (e.g., 'jpeg', 'png').
     * @returns {Promise<HTMLImageElement>} A promise that resolves with the converted image element.
     * @throws {Error} Thrown if there are errors during the conversion process.
     * 
     * @description This method converts the provided pixel array data to an image. It sets up a canvas with the 
     * specified width and height, creates an ImageData object using the pixel array data, draws the image data 
     * onto the canvas, converts the canvas content to a blob, and creates a new image element with the blob URL.
     * Finally, it returns the image element asynchronously within a Promise.
     * 
     */
    async convertToImage(pixelArray, width, height, type) {
        this.canvas.width = width;
        this.canvas.height = height;
        const imageData = this.context.createImageData(width, height);
        imageData.data.set(pixelArray);
        this.context.putImageData(imageData, 0, 0);
        return new Promise((resolve, reject) => {
            this.canvas.toBlob((blob) => {
                const image = new Image();
                image.onload = () => { resolve(image); };
                image.onerror = (error) => { reject(error); };
                image.src = URL.createObjectURL(blob);
            }, "image/" + type);
        });
    }

    /**
     * Determines the image type based on the image source URL.
     * 
     * @param {string} imageSrc - The URL of the image.
     * @returns {string} The type of the image ('jpeg', 'png', 'gif', 'bmp', 'webp').
     * 
     * @description This function extracts the image type from the provided image source URL. 
     * It searches for known image file extensions such as jpg, jpeg, png, gif, bmp, or webp using 
     * a regular expression. If the image type is 'jpg', it returns 'jpeg' to match MIME type conventions.
     * 
     */
    getImageType(imageSrc) {
        const result = imageSrc.match(/(jpg|jpeg|png|gif|bmp|webp)/)[0];
        if (result === "jpg")
            return "jpeg";
        return result;
    }
}