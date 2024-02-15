/**
 *  Function that given array in the format [[g1,g1,g1],..., [gn,gn,gn]] it converts it gray scale in format [[R,G,B,255],..., [R,G,B,255]]
 *  @param {number[]} image_to_convert: image that has to be encrypt in the format [[g1,g1,g1],..., [gn,gn,gn]]
 *  @returns {number[][]} encrypted_image: gray scale  image in the format [[R,G,B,255],..., [R,G,B,255]]
 */
function convert_to_rgb_from_gray(image_to_convert) {
  var rgb_image = [];
  for (let i = 0; i < image_to_convert.length; i++) {
   
      rgb_image.push([
        Math.round(image_to_convert[i][0] / 0.299),
        Math.round(image_to_convert[i][0] / 0.587),
        Math.round(image_to_convert[i][0] / 0.114),
        255,
      ]);
  }
  return rgb_image;
}

export default convert_to_rgb_from_gray;
