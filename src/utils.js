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
        if (!match) {
            throw new Error("Invalid hex color: " + color);
        }
        rgbColors.push([
            parseInt(match[1], 16),
            parseInt(match[2], 16),
            parseInt(match[3], 16)
        ]);
    });
    return rgbColors;
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

/**
 * Function to convert RGB color to HSL
 * @param {number} r: Red value (0 to 255)
 * @param {number} g: Green value (0 to 255)
 * @param {number} b: Blue value (0 to 255)
 * @returns {number[]} HSL representation [Hue, Saturation, Lightness]
 */
function rgbToHsl(r, g, b) {
    if (r < 0 || r > 255 || g < 0 || g > 255 || b < 0 || b > 255)
        throw new Error("RGB format is invalid.")
    r /= 255;
    g /= 255;
    b /= 255;
    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    let h, s, l = (max + min) / 2;

    if (max === min) {
        h = s = 0;
    } else {
        const d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
        switch (max) {
        case r: h = (g - b) / d + (g < b ? 6 : 0); break;
        case g: h = (b - r) / d + 2; break;
        case b: h = (r - g) / d + 4; break;
        }
        h /= 6;
    }

    return [
        Math.round(h * 360),
        Math.round(s * 100),
        Math.round(l * 100)
    ];
}

/**
 * Function to convert HSL color to RGB
 * @param {number} h: Hue value (0 to 360)
 * @param {number} s: Saturation value (0 to 100)
 * @param {number} l: Lightness value (0 to 100)
 * @returns {number[]} RGB representation [Red, Green, Blue]
 */
function hslToRgb(h, s, l) {
    if (h < 0 || h > 360 || s < 0 || s > 100 || l < 0 || l > 100)
        throw new Error("HSL format is invalid.")
    s /= 100;
    l /= 100;
    const k = n => (n + h / 30) % 12;
    const a = s * Math.min(l, 1 - l);
    const f = n =>
        l - a * Math.max(-1, Math.min(k(n) - 3, Math.min(9 - k(n), 1)));
    return [255 * f(0), 255 * f(8), 255 * f(4)];
}

export default {
    rgbToHex,
    hexToRgb,
    validate,
    removeAlpha,
    removeAlphaSerialized,
    deserializeArray,
    rgbToHsl,
    hslToRgb
};