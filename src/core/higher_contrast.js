/**
 *  Function that given a color in the format [R,G,B] it converts it gray scale in format [R,G,B]
 *  @param {number[]} color:color that has to be calculated the one with the higher contrast in the format [R,G,B]
 *  @returns {number[]} color with the higher contrast of color in the format [R,G,B]
 */
function higherColorContrast(color) {
  return [255-color[0],255-color[1],255-color[2]];
}

export default higherColorContrast;
