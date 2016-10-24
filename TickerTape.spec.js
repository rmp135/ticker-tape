TickerTape = require('./TickerTape').default

describe("Constructor", () => {
  it('should default to scrambler', () => {
    const ticker = new TickerTape({ word: "something" });
    
  })
  it("should throw an error when consctructing without a word", () => {
    const fn = () => new TickerTape({})
    expect(fn).toThrow("Options value [word] must be a string.")
  })
  it('should tick', () => {
    const ticker = new TickerTape({ word: "something" });
    ticker.tick()
    ticker.tick()
    console.log(ticker.CurrentWord)
  })
})