function getPixelArray(image) {
    const { canvas, context } = createCanvas();
    canvas.width = image.naturalWidth;
    canvas.height = image.naturalHeight;
    context.drawImage(image, 0, 0, image.naturalWidth, image.naturalHeight);
    return context.getImageData(0, 0, image.naturalWidth, image.naturalHeight).data;
}

function resizeByQuality(image, quality) {
    const { canvas, context } = createCanvas();
    const newWidth = image.naturalWidth * ((quality - 1) * 0.10);
    const newHeight = image.naturalHeight * ((quality - 1) * 0.10);
    canvas.width = newWidth;
    canvas.height = newHeight;
    context.drawImage(image, 0, 0, newWidth, newHeight);
    let resizedImage = new Image();
    resizedImage.src = canvas.toDataURL();
    return resizedImage;
}

function resizeByWidth(image, newWidth) {
    const { canvas, context } = createCanvas();
    const newHeight = image.naturalHeight * (newWidth / image.naturalWidth);
    canvas.width = newWidth;
    canvas.height = newHeight;
    context.drawImage(image, 0, 0, newWidth, newHeight);
    let resizedImage = new Image();
    resizedImage.src = canvas.toDataURL();
    return resizedImage;
}

function resizeByHeight(image, newHeight) {
    const { canvas, context } = createCanvas();
    const newWidth = image.naturalWidth * (newHeight / image.naturalHeight);
    canvas.width = newWidth;
    canvas.height = newHeight;
    context.drawImage(image, 0, 0, newWidth, newHeight);
    let resizedImage = new Image();
    resizedImage.src = canvas.toDataURL();
    return resizedImage;
}

function createCanvas() {
    const canvas = document.createElement("canvas")
    const context = canvas.getContext("2d")
    context.imageSmoothingEnabled = true;
    return { canvas: canvas, context: context };
}

function convertToImage(pixelArray, width, height) {
    const { canvas, context } = createCanvas();
    canvas.width = width;
    canvas.height = height;
    let imageData = context.createImageData(width, height);
    imageData.data.set(new Uint8ClampedArray(pixelArray));
    context.putImageData(imageData, 0, 0);
    let image = new Image();
    image.src = canvas.toDataURL();
    return image;
}

function removeAlpha(pixelArray) {
    let result = [];
    for (let i = 0; i < pixelArray.length / 4; i++) {
        result.push([pixelArray[i * 4], pixelArray[i * 4 + 1], pixelArray[i * 4 + 2]]);
    }
    return result
}

function rgbToHex(rgbColors) {
    let hexColors = [];
    rgbColors.forEach(color => {
        hexColors.push("#" + (1 << 24 | color[0] << 16 | color[1] << 8 | color[2]).toString(16).slice(1));
    });
}

function hexToRgb(hexColors) {
    let rgbColors = [];
    hexColors.forEach(color => {
        color = color.replace(/^#?([a-f\d])([a-f\d])([a-f\d])$/i, (m, r, g, b) => r + r + g + g + b + b);
        const match = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        return match ? rgbColors.push([
            parseInt(match[1], 16),
            parseInt(match[2], 16),
            parseInt(match[3], 16)
        ]) : null;
    });
}

function validate(quality, colorNumber) {
    if (quality < 1 || quality > 10) {
        throw new Error("The quality parameter is invalid: it must be a number between 1 and 10")
    }
    if (colorNumber < 1 || colorNumber > 10) {
        throw new Error("color number invalid ")
    }
}

export default {
    getPixelArray,
    rgbToHex,
    hexToRgb,
    validate,
    resizeByQuality,
    removeAlpha,
    resizeByWidth,
    resizeByHeight,
    convertToImage
};