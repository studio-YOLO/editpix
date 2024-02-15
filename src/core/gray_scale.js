/**
 *  Functiom that given array in the format [[R,G,B],..., [R,G,B]] it converts it gray scale in format [[g1,g1,g1], ..., [gn,gn,gn]]
 *  @param {number[]} image_to_convert: image that has to be encrypt in the format [[R,G,B],..., [R,G,B]]
 *  @returns {number[][]} encrypted_image: gray scale  image in the format [[g1,g1,g1], ..., [gn,gn,gn]]
 */
function convert_to_gray_scale(image_to_convert) {
  var gray_scaled_image = [];
  for (let i = 0; i < image_to_convert.length; i++) {
    var elem_to_add = [
      Math.round(
        0.299 * image_to_convert[i][0] +
        0.587 * image_to_convert[i][1] +
        0.114 * image_to_convert[i][2]),
    ];

    gray_scaled_image.push([elem_to_add, elem_to_add, elem_to_add]);

  }
  return gray_scaled_image;
}

export default convert_to_gray_scale;
