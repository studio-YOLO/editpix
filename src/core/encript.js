/**
 *  Functiom that given array in the format [R,G,B,Alfa] it converts it in [[R,G,B],..., [R,G,B]]
 *  @param {number[]} image_to_encrypt: image that has to be encrypt in the format [R,G,B,Alfa]
 *  @returns {number[][]} encrypted_image: encrypted image in the format [[R,G,B],..., [R,G,B]]
 */
function encript(image_to_encrypt) {
  var encripted_image = [];

  for (let i = 0; i < image_to_encrypt.length / 4; i++) {
    if (i == 0)
      encripted_image.push([
        image_to_encrypt[0],
        image_to_encrypt[1],
        image_to_encrypt[2],
      ]);
    else
      encripted_image.push([
        image_to_encrypt[4 * i],
        image_to_encrypt[4 * i + 1],
        image_to_encrypt[4 * i + 2],
      ]);
  }

  return encripted_image;
}

export default encript;
