function findMostFrequentCombination(array) {
    var max = 0; 
    var best = "";
    
    var dict = {};
    
    for (let i = 0; i < array.length - 2; i++) {
        var key = array[i].toString() ;
      
        if (key in dict) dict[key]++;
        else dict[key] = 1;

        if (dict[key] > max) {
            max = dict[key]; 
            best = key;
        }
    } 
    return best.split(",").map(Number);
}

export default findMostFrequentCombination;
