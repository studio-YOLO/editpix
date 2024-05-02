import EditPix from "../../src/editpix.js";

const editpix = new EditPix();

//color
const hexColor = "#78828c";

//convert color from hex to rgb
const rgbColor = editpix.hexToRgb(hexColor);

//get the higher contrast color
const higherColorContrastRgb = editpix.getHigherContrast(rgbColor.r, rgbColor.g, rgbColor.b);

//convert higher contrast color from rgb to hex
const higherColorContrastHex = editpix.rgbToHex(higherColorContrastRgb.r, higherColorContrastRgb.g, higherColorContrastRgb.b);


//display results
document.body.style.backgroundColor = hexColor;
const contrastText = document.createElement("h1");
contrastText.textContent = "Hello World!"
contrastText.style.color = higherColorContrastHex;
document.body.appendChild(contrastText)
