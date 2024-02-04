function findMostFrequentCombination(matrix, number_feature_result) {
  var dict = {};

  // Count the frequency of each RGB combination
  for (let i = 0; i < matrix.length; i++) {
    var key = matrix[i].toString();

    if (key in dict) {
      dict[key]++;
    } else {
      dict[key] = 1;
    }
  }

  // Sort the combinations based on frequency in ascending order
  var sortedCombinations = Object.keys(dict).sort(function (a, b) {
    return dict[a] - dict[b];
  });

  // Get the top N combinations
  var result = sortedCombinations.slice(0, number_feature_result);

  return result;
}

export default findMostFrequentCombination;
