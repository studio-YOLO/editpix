/**
 *  Functiom that given array in the format [R,G,B,alfa,...,R,G,B,alfa] it converts it gray scale in format [g1,g1,g1,alfa,...,gn,gn,gn,alfa]
 *  @param {number[]} image_to_convert: image that has to be encrypt in the format [R,G,B,alfa,..., R,G,B,alfa]
 *  @returns {number[][]} gray_scaled_image: gray scale  image in the format [g1,g1,g1,alfa,...,gn,gn,gn,alfa]
 */
function convert_to_gray_scale(image_to_convert) {
  var gray_scaled_image = [];
  for (let i = 0; i < image_to_convert.length/4; i++) {
    var elem_to_add = 
       Math.round( 0.299 * image_to_convert[4*i] +
        0.587 * image_to_convert[4*i+1] +
        0.114 * image_to_convert[4*i+2])
      ;

      gray_scaled_image.push([elem_to_add, elem_to_add, elem_to_add, image_to_convert[4*i+3]]);
    
  }
  return gray_scaled_image;
}

export default convert_to_gray_scale;
