const fs = require('fs');

const words = fs.readFileSync('wordlist.txt')
  .toString()
  .toLowerCase()
  .split('\n');

const countDiffs = function diffs(word1, word2) {
  let count = 0;
  for (let i = 0; i < word1.length; i += 1) {
    if (word1[i] !== word2[i]) count += 1;
  }
  return count;
};

let globalFound = [];

const search = function srch(start, end, previousList) {
  const prev = previousList.concat(start);
  globalFound = globalFound.concat(start);
  if (start === end) return prev;
  const wordlist = words.filter(word => word.length === end.length && countDiffs(start, word) === 1
    && previousList.indexOf(word) === -1 && globalFound.indexOf(word) === -1)
    .filter((word, idx, list) => list.indexOf(word) === idx)
    .sort((word1, word2) => countDiffs(word1, end) - countDiffs(word2, end));
  for (let i = 0; i < wordlist.length; i += 1) {
    const x = search(wordlist[i], end, prev);
    if (x) {
      return x;
    }
  }
  return null;
};

module.exports = function wordChain(start, end) {
  return search(start, end, []);
};

const start = process.argv[2];
const end = process.argv[3];
console.log('Start: ', start, ' End: ', end);
console.log(search(start, end, []));
