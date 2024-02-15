/**
 *  Function that given array in the format [g1,g1,g1,alfa1,...,gn,gn,gn,alfan] it converts it gray scale in format [R,G,B,alfa,...,R,G,B,alfa]
 *  @param {number[]} image_to_convert: image that has to be encrypt in the format [g1,g1,g1,alfa1,...,gn,gn,gn,alfan]
 *  @returns {number[][]} encrypted_image: gray scale  image in the format [R,G,B,alfa,...,R,G,B,alfa]
 */
function convert_to_rgb_from_gray(image_to_convert) {
  var rgb_image = [];
  for (let i = 0; i < image_to_convert.length/4; i++) {
   
      rgb_image.push(
        Math.round(image_to_convert[4*i] / 0.299),
        Math.round(image_to_convert[4*i] / 0.587),
        Math.round(image_to_cenvert[4*i] / 0.114),
        image_to_convert[4*i+3]
      );
  }
  return rgb_image;
}

export default convert_to_rgb_from_gray;
