var fs = require('fs');

var words = fs.readFileSync("wordlist.txt")
              .toString()
              .toLowerCase()
              .split("\n");

var countDiffs = function(word1, word2) {
    var count = 0;
    for (var i = 0; i < word1.length; i++) {
        if (word1[i] !== word2[i]) count++;
    }
    return count;
}

var globalFound = []

var search = function(start, end, previousList) {
    previousList = previousList.concat(start);
    globalFound = globalFound.concat(start);
    if (start === end) return previousList;
    var wordlist = words.filter(function(word) {
        return word.length === end.length && countDiffs(start, word) === 1 && previousList.indexOf(word) === -1 && globalFound.indexOf(word) === -1;
    }).filter(function(word, idx, list) {
        return list.indexOf(word) === idx;
    }).sort(function(word1, word2) {
        return countDiffs(word1, end) - countDiffs(word2, end);
    })
    for (var i = 0; i < wordlist.length; i++) {
        var x = search(wordlist[i], end, previousList);
        if (x)
            return x;
    }
}

module.exports = function wordChain(start, end) {
    return search(start, end, []);
};

const start = process.argv[2];
const end = process.argv[3];
console.log('Start: ', start, ' End: ', end);
console.log(search(start, end, []));