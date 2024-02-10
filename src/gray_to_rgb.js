/**
 *  Functiom that given array in the format [[[R,G,B],..., [R,G,B]] it converts it gray scale in format [g1, ..., gn]
 *  @param {number[]} image_to_convert: image that has to be encrypt in the format [[[R,G,B],..., [R,G,B]]
 *  @returns {number[][]} encrypted_image: gray scale  image in the format [g1, ..., gn]
 */
function convert_to_rgb_from_gray(image_to_convert) {
  var rgb_image = [];
  for (let i = 0; i < image_to_convert.length / 4; i++) {
    if (i == 0)
      rgb_image.push([
        image_to_convert[0] / 0.299,
        image_to_convert[1] / 0.587,
        image_to_convert[2] / 0.114,
      ]);
    else
      rgb_image.push([
        image_to_convert[4 * i] / 0.299,
        image_to_convert[4 * i + 1] / 0.587,
        image_to_convert[4 * i + 2] / 0.114,
      ]);
  }
  return rgb_image;
}

export default convert_to_rgb_from_gray;
