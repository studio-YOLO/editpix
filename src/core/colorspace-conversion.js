function rgbToHex(r, g, b) {
    return "#" + (1 << 24 | r << 16 | g << 8 | b).toString(16).slice(1);
}

function hexToRgb(hexColor) {
    hexColor = hexColor.replace(/^#?([a-f\d])([a-f\d])([a-f\d])$/i, (m, r, g, b) => r + r + g + g + b + b);
    const match = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hexColor);
    if (!match) {
        throw new Error("Invalid hex color: " + hexColor);
    }
    return {
        r: parseInt(match[1], 16),
        g: parseInt(match[2], 16),
        b: parseInt(match[3], 16)
    }
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

    return {
        h: Math.round(h * 360),
        s: Math.round(s * 100),
        l: Math.round(l * 100)
    };
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
    return {
        r: 255 * f(0),
        g: 255 * f(8),
        b: 255 * f(4)
    };
}

export {
    rgbToHex,
    hexToRgb,
    rgbToHsl,
    hslToRgb
}