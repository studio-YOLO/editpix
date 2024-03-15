import EditPix from "../../src/editpix.js";

const editpix = new EditPix();

const url = "images/img1.jpg";

var image = new Image();
image.src = url;

var container = document.createElement("div");
container.classList.add("container")

//waiting image load
image.onload = () => {
    console.log("Image loaded.");
    
    editpix.getColorPaletteWasm(image, 15, 2, "median cut")
        .then(colorPalette => {
            console.log(colorPalette)
            displayPalette(colorPalette);
    });
};


function displayPalette(colorPaletteRgb) {
    //convert color palette in HEX format
    const colorPaletteHex = editpix.convertToHex(colorPaletteRgb);
    console.log(colorPaletteHex)
    container.appendChild(image);
    //print output
    var colorContainer = document.createElement("div")
    colorContainer.classList.add("color_container")
    colorPaletteHex.forEach(color => {
        var colorDiv = document.createElement("div")
        colorDiv.classList.add("color")
        colorDiv.style.backgroundColor = color;
        var text = document.createTextNode(color)
        colorDiv.appendChild(text)
        colorContainer.appendChild(colorDiv)
    });
    container.appendChild(colorContainer)
    document.body.appendChild(container)
}