import EditPix from "../../src/editpix.js";

const editpix = new EditPix();

const url = "images/img5.jpeg";

var image = new Image();
image.src = url;

var container = document.createElement("div");
container.classList.add("container")

//waiting image load
image.onload = () => {
    console.log("Perché non va?");
    let colorNumber = 5;

    
    let t2 = Date.now();
    editpix.getColorPaletteWasm2(image, colorNumber)
        .then(colorPalette => {
            let t3 = Date.now();
            console.log(colorPalette)
            displayPalette(colorPalette);
            console.log("Ottimizzato: " + (t3-t2));
    });
    
    
    /*
    let t2 = Date.now();
    editpix.getColorPaletteWasm(image, colorNumber)
        .then(colorPalette => {
            let t3 = Date.now();
            console.log(colorPalette)
            displayPalette(colorPalette);
            console.log("Originale: " + (t3-t2));
    });
    */

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