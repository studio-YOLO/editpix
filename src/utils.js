function removeAlpha(pixelArray) {
    let result = [];
    for (let i = 0; i < pixelArray.length / 4; i++) {
        result.push([pixelArray[i * 4], pixelArray[i * 4 + 1], pixelArray[i * 4 + 2]]);
    }
    return result
}

function removeAlphaSerialized(pixelArray) {
    let result = [];
    for (let i = 0; i < pixelArray.length / 4; i++) {
        result.push(pixelArray[i * 4], pixelArray[i * 4 + 1], pixelArray[i * 4 + 2]);
    }
    return result
}

function rgbToHex(rgbColors) {
    let hexColors = [];
    rgbColors.forEach(color => {
        hexColors.push("#" + (1 << 24 | color[0] << 16 | color[1] << 8 | color[2]).toString(16).slice(1));
    });
    return hexColors;
}

function hexToRgb(hexColors) {
    let rgbColors = [];
    hexColors.forEach(color => {
        color = color.replace(/^#?([a-f\d])([a-f\d])([a-f\d])$/i, (m, r, g, b) => r + r + g + g + b + b);
        const match = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(color);
        return match ? rgbColors.push([
            parseInt(match[1], 16),
            parseInt(match[2], 16),
            parseInt(match[3], 16)
        ]) : () => { throw new Error("The input hex is wrong.") };
    });
    return rgbColors;
}

function validate(quality, colorNumber) {
    if (quality < 1 || quality > 10) {
        throw new Error("The quality parameter is invalid: it must be a number between 1 and 10")
    }
    if (colorNumber < 1 || colorNumber > 10) {
        throw new Error("Color number is invalid.")
    }
}

function deserializeArray(serializedArray, chunkSize) {
    const result = [];
    for (let i = 0; i < serializedArray.length; i += chunkSize) {
        result.push(serializedArray.slice(i, i + chunkSize));
    }
    return result;
}

export default {
    rgbToHex,
    hexToRgb,
    validate,
    removeAlpha,
    removeAlphaSerialized,
    deserializeArray
};