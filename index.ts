import TickerTape from './TickerTape'
import Unscrambler from './Unscrambler'

let options = {
  scrambler: new Unscrambler("something", { startingWord: "ses" }),
  el: "#something",
}

let ticker = new TickerTape(options)

ticker.onComplete(() => {
  console.log("JOB DONE")
})

ticker.autoTick(50)