const ImageManager = function () {
    this.canvas = document.createElement("canvas")
    this.context = this.canvas.getContext("2d", { willReadFrequently: true })
}

ImageManager.prototype.getPixelArray = async function (image) {
    const bitmap = await createImageBitmap(image);
    this.canvas.width = bitmap.width;
    this.canvas.height = bitmap.height;
    this.context.drawImage(bitmap, 0, 0);
    return this.context.getImageData(0, 0, bitmap.width, bitmap.height).data;
}

ImageManager.prototype.resizeByPercentage = async function (image, percentage) {
    const newWidth = image.naturalWidth * (percentage / 100);
    const newHeight = image.naturalHeight * (percentage / 100);
    this.canvas.width = newWidth;
    this.canvas.height = newHeight;
    this.context.drawImage(image, 0, 0, newWidth, newHeight);
    return new Promise((resolve, reject) => {
        this.canvas.toBlob((blob) => {
            const image = new Image();
            image.onload = () => { resolve(image) }
            image.onerror = (error) => { reject(error) }
            image.src = URL.createObjectURL(blob);
        }, "image/" + this.getImageType(image.src));
    })
}

ImageManager.prototype.resizeByWidth = async function (image, newWidth) {
    const newHeight = image.naturalHeight * (newWidth / image.naturalWidth);
    this.canvas.width = newWidth;
    this.canvas.height = newHeight;
    this.context.drawImage(image, 0, 0, newWidth, newHeight);
    return new Promise((resolve, reject) => {
        this.canvas.toBlob((blob) => {
            const image = new Image();
            image.onload = () => { resolve(image) }
            image.onerror = (error) => { reject(error) }
            image.src = URL.createObjectURL(blob);
        }, "image/" + this.getImageType(image.src))
    })
}

ImageManager.prototype.resizeByHeight = async function (image, newHeight) {
    const newWidth = image.naturalWidth * (newHeight / image.naturalHeight);
    this.canvas.width = newWidth;
    this.canvas.height = newHeight;
    this.context.drawImage(image, 0, 0, newWidth, newHeight);
    return new Promise((resolve, reject) => {
        this.canvas.toBlob((blob) => {
            const image = new Image();
            image.onload = () => { resolve(image) }
            image.onerror = (error) => { reject(error) }
            image.src = URL.createObjectURL(blob);
        }, "image/" + this.getImageType(image.src))
    })
}

ImageManager.prototype.convertToImage = async function (pixelArray, width, height, type) {
    this.canvas.width = width;
    this.canvas.height = height;
    const imageData = this.context.createImageData(width, height);
    imageData.data.set(pixelArray);
    this.context.putImageData(imageData, 0, 0);
    return new Promise((resolve, reject) => {
        this.canvas.toBlob((blob) => {
            const image = new Image();
            image.onload = () => { resolve(image) }
            image.onerror = (error) => { reject(error) }
            image.src = URL.createObjectURL(blob);
        }, "image/" + type)
    })
}

ImageManager.prototype.getImageType = function (imageSrc) {
    const result = imageSrc.match(/(jpg|jpeg|png|gif|bmp|webp)/)[0]
    if (result === "jpg")
        return "jpeg"
    return result;
}

export default ImageManager;