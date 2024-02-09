function getPixelArray(image, quality) {
    const canvas = document.createElement("canvas")
    const context = canvas.getContext("2d")
    context.imageSmoothingEnabled = true;
    const { newWidth, newHeight } = resizeImage(image.naturalWidth, image.naturalHeight, quality)
    canvas.width = newWidth;
    canvas.height = newHeight;
    context.drawImage(image, 0, 0, newWidth, newHeight);
    return removeAlpha(context.getImageData(0, 0, newWidth, newHeight).data, newWidth, newHeight);
}

function resizeImage(naturalWidth, naturalHeight, quality) {
    switch (quality) {
        case 1:
            return { newWidth: naturalWidth, newHeight: naturalHeight }
        case 2:
            return { newWidth: naturalWidth * 0.75, newHeight: naturalHeight * 0.75 }
        case 3:
            return { newWidth: naturalWidth * 0.50, newHeight: naturalHeight * 0.50 }
        case 4:
            return { newWidth: naturalWidth * 0.25, newHeight: naturalHeight * 0.25 }
    }
}

function removeAlpha(colors, width, height) {
    let result = [];
    for (var i = 0; i < width * height; i++) {
        if (i == 0) {
            result.push([colors[i], colors[i + 1], colors[i + 2]])
        } else {
            result.push([colors[i * 4], colors[i * 4 + 1], colors[i * 4 + 2]])
        }
    }
    return result
}

function convertRgbToHex(rgbColors) {
    console.log(rgbColors)
    for (let i = 0; i < rgbColors.length; i++) {
        return "#" + convertToHex(rgbColors[i][0]) + convertToHex(rgbColors[i][1]) + convertToHex(rgbColors[i][2])
    }
}

function convertToHex(c) {
    let hex = c.toString(16);
    return hex.length == 1 ? "0" + hex : hex;
}

function validation(quality, colorNumber, returnType) {
    if (quality < 1 || quality > 4) {
        throw new Error("The quality parameter is invalid: it must be a number between 1 and 4")
    }
    if (colorNumber < 1 || colorNumber > 10) {
        throw new Error("color number invalid ")
    }
    if (returnType != "rgb" && returnType != "hex") {
        throw new Error("ReturnType parameter is invalid: must be 'rgb' or 'hex' ")
    }
}

export default {
    getPixelArray,
    convertRgbToHex,
    validation
};