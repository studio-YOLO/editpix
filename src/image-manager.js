export default class ImageManager {

    constructor() {
        this.canvas = document.createElement("canvas");
        this.context = this.canvas.getContext("2d", { willReadFrequently: true });
    }


    async getPixelArray(image) {
        const bitmap = await createImageBitmap(image);
        this.canvas.width = bitmap.width;
        this.canvas.height = bitmap.height;
        this.context.drawImage(bitmap, 0, 0);
        return this.context.getImageData(0, 0, bitmap.width, bitmap.height).data;
    }

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
    
    getImageType(imageSrc) {
        const result = imageSrc.match(/(jpg|jpeg|png|gif|bmp|webp)/)[0];
        if (result === "jpg")
            return "jpeg";
        return result;
    }
}