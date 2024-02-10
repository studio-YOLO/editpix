import ImagePalette from "../../src/image-palette.js";

const imagePalette = new ImagePalette();

const imagesUrl = [
  "../images/img1.jpg",
  "../images/img3.jpeg",
  "../images/img4.webp",
];

const images = [];

imagesUrl.forEach((url) => {
  let tmpImages = document.createElement("img");
  tmpImages.src = url;
  images.push(tmpImages);
});

images.forEach((image) => {
  image.addEventListener("load", () => {
    var canvas16 = canvasQuantization(image, 16);
    var canvas8 = canvasQuantization(image, 8);

    var imgContainer = document.createElement("div");
    imgContainer.style.display = "flex";
    imgContainer.style.flexDirection = "row";

    imgContainer.appendChild(image);
    imgContainer.appendChild(canvas16);
    imgContainer.appendChild(canvas8);
    document.body.appendChild(imgContainer);
  });
});

function canvasQuantization(image, bit) {
  let pixelArray = imagePalette.getPixelArray(image, 1, bit);
  let canvas = document.createElement("canvas");
  let context = canvas.getContext("2d");

  canvas.width = image.naturalWidth;
  canvas.height = image.naturalHeight;

  let imageData = context.createImageData(
    image.naturalWidth,
    image.naturalHeight
  );
  for (let i = 0; i < imageData.data.length; i++) {
    imageData.data[i] = pixelArray[i];
  }

  context.putImageData(imageData, 0, 0);

  return canvas;
}
