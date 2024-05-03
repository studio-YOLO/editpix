function removeAlpha(pixelArray) {
    let result = [];
    for (let i = 0; i < pixelArray.length / 4; i++) {
        if (pixelArray[i * 4 + 3] >= 127) {
            result.push([pixelArray[i * 4], pixelArray[i * 4 + 1], pixelArray[i * 4 + 2]]);
        }
    }
    return result;
}

function removeAlphaSerialized(pixelArray) {
    let result = [];
    for (let i = 0; i < pixelArray.length / 4; i++) {
        result.push(pixelArray[i * 4], pixelArray[i * 4 + 1], pixelArray[i * 4 + 2]);
    }
    return result;
}

function validate(quality, colorNumber) {
    if (quality < 1 || quality > 10) {
        throw new Error("The quality parameter is invalid: it must be a number between 1 and 10")
    }
    if (colorNumber < 1 || colorNumber > 15) {
        throw new Error("Color number is invalid.")
    }
}

function deserializeArray(serializedArray) {
    const result = [];
    for (let i = 0; i < serializedArray.length; i += 3) {
        result.push(Array.from(serializedArray.slice(i, i + 3)));
    }
    return result;
}

export default {
    validate,
    removeAlpha,
    removeAlphaSerialized,
    deserializeArray
};