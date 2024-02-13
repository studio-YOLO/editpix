/**
 *  Functiom that given a color in the format [R,G,B] it converts it gray scale in format [R,G,B]
 *  @param {number[]} color_to_analyze:color that has to be calculated the one with the higher contrast in the format [R,G,B]
 *  @returns {number[]} color with the higher contrast of color_to_analyze in the format [R,G,B]
 */
function higher_color_contrast(color_to_analyze) {
  return [255-color_to_analyze[0],255-color_to_analyze[1],255-color_to_analyze[2]];
}

export default higher_color_contrast;
