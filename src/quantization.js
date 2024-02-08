/**
 * Functions that given an image it quantize the image and returns the image quantized in n bits
 * @param {number[][]} image: image that has to be quantized. Format: [[R,G,B], ..., [R,G,B]]
 * @param {number} n: number of bits
 * @returns {number[][]} The quantized image with n bits, represented in the same format as the input image.
 */
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
