import EditPix from "../../src/editpix.js"

const editpix = new EditPix();

// HEX to RGB
const blackHex = "#000000";
console.log(editpix.hexToRgb(blackHex))

const whiteHex = "#fff";
console.log(editpix.hexToRgb(whiteHex))

const hexColorsArray = ["#000", "#ffffff", "#ff0000"]
hexColorsArray.forEach(color => {
    console.log(editpix.hexToRgb(color))
});


//RGB to HEX
const blackRgb = { r: 0, g: 0, b: 0 }
console.log(editpix.rgbToHex(blackRgb.r, blackRgb.g, blackRgb.b))

// convert directly
console.log(editpix.rgbToHex(255, 255, 255))    //white

const rgbColorsArray = [{ r: 0, g: 0, b: 0 }, { r: 255, g: 0, b: 0 }]
rgbColorsArray.forEach(color => {
    console.log(editpix.rgbToHex(color.r, color.g, color.b))
});

// RGB to HSL
const blackRgb_ = { r: 0, g: 0, b: 0 }
console.log(editpix.rgbToHsl(blackRgb_.r, blackRgb_.g, blackRgb_.b))

//convert directly
console.log(editpix.rgbToHsl(255, 255, 255))    //white
console.log(editpix.rgbToHsl(255, 0, 0))    //red


//HSL to RGB
const blackHsl = { h: 0, s: 0, l: 0 }
console.log(editpix.hslToRgb(blackHsl.h, blackHsl.s, blackHsl.l))

//convert directly
console.log(editpix.hslToRgb(0, 0, 100))    //white
console.log(editpix.hslToRgb(0, 100, 50))    //red