import ImagePalette from "../../src/image-palette.js";

const imagePalette = new ImagePalette()

var image = document.getElementById("img_1");
var imgPalette = new ImagePalette();


var color = []
for (var i = 0; i < images.length; i++) {
    if (images[i].complete) {
        color.push(imgPalette.getColorPalette(images[i], 4, 4, "hex"));
    }
}

console.log(color)

var divs = document.createElement("div")
divs.setAttribute("class", "container")

document.getElementById("color1").style.backgroundColor = color[0]
document.getElementById("color2").style.backgroundColor = color[1]
document.getElementById("color3").style.backgroundColor = color[2]
document.getElementById("color4").style.backgroundColor = color[3]

