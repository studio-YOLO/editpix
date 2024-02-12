/**
 *  Functiom that given array in the format [[[R,G,B],..., [R,G,B]] it converts in white and black in the format of a list. Possible values are just 0 and 255
 *  @param {number[][]} image_to_convert: image that has to be encrypt in the format [[[R,G,B],..., [R,G,B]]
 *  @returns {number[]} bw_image: gray scale  image in the format of a list. Possible values are just 0 and 255
 */
function convert_to_black_and_white(image_to_convert) {
  var bw_image = [];

  for (let i = 0; i < image_to_convert.length / 4; i++) {
    if (i == 0)
      var gray_scaled_image =
        0.299 * image_to_convert[0] +
        0.587 * image_to_convert[1] +
        0.114 * image_to_convert[2];
    else
      var gray_scaled_image =
        0.299 * image_to_convert[4 * i] +
        0.587 * image_to_convert[4 * i + 1] +
        0.114 * image_to_convert[4 * i + 2];
  }
  if (gray_scaled_image >= 128) bw_image.push(255);
  else bw_image.push(0);

  return bw_image;
}

export default convert_to_black_and_white;
