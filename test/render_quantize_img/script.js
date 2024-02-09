import ImagePalette from "../../src/image-palette.js";

var image = document.getElementById("img_1")

const imagePalette = new ImagePalette()

if(image.complete){
    var pixelArray = imagePalette.getPixelArray(image, 1, 16);
}

var canvas = document.createElement("canvas")
var context = canvas.getContext("2d")

canvas.width = image.naturalWidth
canvas.height = image.naturalHeight

var imageData = context.createImageData(image.naturalWidth, image.naturalHeight)
for(let i = 0; i < imageData.data.length; i++){
    imageData.data[i] = pixelArray[i];
}

context.putImageData(imageData, 0, 0)

var container = document.getElementsByClassName("container")
container[0].appendChild(canvas)

