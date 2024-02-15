/**
 *  Functiom that given array in the format [[R,G,B],..., [R,G,B]] it converts it in [R,G,B,Alfa]
 *  @param {number[]} image_to_decrypt: image that has to be encrypt in the format [[R,G,B],..., [R,G,B]]
 *  @returns {number[][]} decripted_image: decripted image in the format [R,G,B,Alfa]
 */
function decript(image_to_decrypt) {
  var decripted_image = [];

  for (let i = 0; i < image_to_decrypt.length; i++) {
    var elem_to_add = image_to_decrypt[i];
    decripted_image.push(elem_to_add[0]);
    decripted_image.push(elem_to_add[1]);
    decripted_image.push(elem_to_add[2]);
    decripted_image.push(255);
  }

  return decripted_image;
}

export default decript;
