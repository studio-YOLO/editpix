import ImagePalette from "../src/image-palette.js";
var images = document.getElementsByClassName("img");
var imgPalette = new ImagePalette();

var color = []
for (var i = 0; i < images.length; i++) {
    if (images[i].complete) {
        color.push(imgPalette.getColorPalette(images[i], 4, "hex"));
    }
}

document.getElementById("color1").style.backgroundColor = color[0]
document.getElementById("color2").style.backgroundColor = color[1]
document.getElementById("color3").style.backgroundColor = color[2]
document.getElementById("color4").style.backgroundColor = color[3]

