function quantize(image, n) {
  var quantized_image = [];

  for (let i = 0; i < image.length; i++) {
    var pixelcolor = image[i];

    quantized_image.push([
      Math.floor((pixelcolor[1] / 256) * n),
      Math.floor((pixelcolor[2] / 256) * n),
      Math.floor((pixelcolor[3] / 256) * n),
    ]);
  }
  return quantized_image;
}

export default quantize;
