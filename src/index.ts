import TickerTape from './TickerTape'
import Unscrambler from './Unscrambler'
import StyledUnscrambler from './StyledUnscrambler'

let options = {
  scrambler: new StyledUnscrambler("something", { cyclesPerChar: 3 }),
  el: "#something",
}

let ticker = new TickerTape(options)

ticker.onComplete(() => {
  console.log("JOB DONE")
})

ticker.autoTick(100)