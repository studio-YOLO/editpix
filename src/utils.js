function getPixelArray(image, quality = 1) {
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

function validate(quality, colorNumber, returnType) {
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
    rgbToHex,
    hexToRgb,
    validate
};