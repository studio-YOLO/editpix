/**
 * Functions that given an image it returns a matrix of n most frequent colors
 * @param {number[][]} matrix: image that has to be retrieved. Format: [[R,G,B], ..., [R,G,B]]
 * @param {number} number_feature_result: number of features that has to be returned
 * @returns {number[][]} The n most frequent colors
 */
function findMostFrequentCombination(matrix, number_feature_result) {
  var dict = {};

  for (let i = 0; i < matrix.length; i++) {
    var key = matrix[i].toString();

    if (key in dict) {
      dict[key]++;
    } else {
      dict[key] = 1;
    }
  }

  var sortedCombinations = Object.keys(dict).sort(function (a, b) {
    return dict[a] - dict[b];
  });

  var result = sortedCombinations.slice(0, number_feature_result);

  return result;
}

export default findMostFrequentCombination;
