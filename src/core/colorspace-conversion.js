/**
 * Convert RGB color values to hexadecimal representation.
 * @param {number} r - The red value (0-255).
 * @param {number} g - The green value (0-255).
 * @param {number} b - The blue value (0-255).
 * @returns {string} The hexadecimal representation of the RGB color.
 */
function rgbToHex(r, g, b) {
    return "#" + (1 << 24 | r << 16 | g << 8 | b).toString(16).slice(1);
}

/**
 * Convert a hexadecimal color code to RGB color values.
 * @param {string} hexColor - The hexadecimal color code (e.g., "#rrggbb" or #rgb).
 * @returns {Object} An object containing the RGB color values.
 * @throws {Error} If the input hex color is invalid.
 */
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
 * Convert RGB color values to HSL (Hue, Saturation, Lightness) representation.
 * @param {number} r - The red value (0-255).
 * @param {number} g - The green value (0-255).
 * @param {number} b - The blue value (0-255).
 * @returns {Object} An object containing the HSL representation of the RGB color.
 */
function rgbToHsl(r, g, b) {
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
 * Convert HSL (Hue, Saturation, Lightness) color values to RGB representation.
 * @param {number} h - The hue value (0-360).
 * @param {number} s - The saturation value (0-100).
 * @param {number} l - The lightness value (0-100).
 * @returns {Object} An object containing the RGB representation of the HSL color.
 */
function hslToRgb(h, s, l) {
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