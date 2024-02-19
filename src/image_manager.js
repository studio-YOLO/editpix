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

function createCanvas() {
    const canvas = document.createElement("canvas")
    const context = canvas.getContext("2d")
    context.imageSmoothingEnabled = true;
    return { canvas: canvas, context: context };
}

export default {
    getPixelArray,
    resizeByQuality,
    resizeByWidth,
    resizeByHeight,
    convertToImage
}