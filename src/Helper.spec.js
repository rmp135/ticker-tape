const Helper = require('./Helper')

describe('generateWord', () => {
  it('should generate a word from a character set', () => {
    const word = Helper.generateWordFromCharacterSet(3, ["a", "b", "c"]);
    expect(typeof word).toBe("string")
  })
})