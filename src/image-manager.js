function getPixelArray(image) {
    const { canvas, context } = createCanvas();
    canvas.width = image.naturalWidth;
    canvas.height = image.naturalHeight;
    context.drawImage(image, 0, 0, image.naturalWidth, image.naturalHeight);
    return context.getImageData(0, 0, image.naturalWidth, image.naturalHeight).data;
}

function resizeByPercentage(image, percentage) {
    if (percentage < 1 || percentage > 100) 
        throw new Error("The percentage value is incorrect: it must be between 1 and 100");
    const { canvas, context } = createCanvas();
    const newWidth = image.naturalWidth * (percentage / 100);
    const newHeight = image.naturalHeight * (percentage / 100);
    canvas.width = newWidth;
    canvas.height = newHeight;
    context.drawImage(image, 0, 0, newWidth, newHeight);
    return new Promise((resolve, reject) => {
        let resizedImage = new Image();
        resizedImage.onload = () => { resolve(resizedImage) }
        resizedImage.onerror = (error) => { reject(error) }
        resizedImage.src = canvas.toDataURL("image/" + getImageType(image.src));
    })
}

function resizeByWidth(image, newWidth) {
    if(newWidth < 0) 
        throw new Error("The width entered is invalid: it must be positive");
    const { canvas, context } = createCanvas();
    const newHeight = image.naturalHeight * (newWidth / image.naturalWidth);
    canvas.width = newWidth;
    canvas.height = newHeight;
    context.drawImage(image, 0, 0, newWidth, newHeight);
    return new Promise((resolve, reject) => {
        let resizedImage = new Image();
        resizedImage.onload = () => { resolve(resizedImage) }
        resizedImage.onerror = (error) => { reject(error) }
        resizedImage.src = canvas.toDataURL("image/" + getImageType(image.src));
    })
}

function resizeByHeight(image, newHeight) {
    if(newHeight < 0) 
        throw new Error("the height entered is invalid: it must be positive");
    const { canvas, context } = createCanvas();
    const newWidth = image.naturalWidth * (newHeight / image.naturalHeight);
    canvas.width = newWidth;
    canvas.height = newHeight;
    context.drawImage(image, 0, 0, newWidth, newHeight);
    return new Promise((resolve, reject) => {
        let resizedImage = new Image();
        resizedImage.onload = () => { resolve(resizedImage) }
        resizedImage.onerror = (error) => { reject(error) }
        resizedImage.src = canvas.toDataURL("image/" + getImageType(image.src));
    })
}

function convertToImage(pixelArray, width, height, type) {
    const { canvas, context } = createCanvas();
    canvas.width = width;
    canvas.height = height;
    let imageData = context.createImageData(width, height);
    imageData.data.set(new Uint8ClampedArray(pixelArray));
    context.putImageData(imageData, 0, 0);
    return new Promise((resolve, reject) => {
        let image = new Image();
        image.onload = () => { resolve(image) }
        image.onerror = (error) => { reject(error) }
        image.src = canvas.toDataURL("image/" + type);
    })
}

function getImageType(imageSrc){
    const regex = /(jpg|jpeg|png|gif|bmp|webp)/;
    return imageSrc.match(regex)[0];
}

function createCanvas() {
    const canvas = document.createElement("canvas")
    const context = canvas.getContext("2d")
    context.imageSmoothingEnabled = true;
    return { canvas: canvas, context: context };
}

export default {
    getPixelArray,
    resizeByPercentage,
    resizeByWidth,
    resizeByHeight,
    convertToImage,
    getImageType
}