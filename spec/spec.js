const wordsList = require('../src/index.js');

describe('cat to dog', () => {
  it('using []', () => {
    expect(search('cat', 'dog', [])).toEqual([]);
  });
});

describe('nothing to nothing', () => {
  it('using emoty quotes', () => {
    expect(search('', '', [])).toEqual([]);
  });
});
