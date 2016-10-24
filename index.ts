import TickerTape from './TickerTape'

let options = {
  word: "something old",
  el: "#something",
  startingWord: ""
}

let ticker = new TickerTape(options)

ticker.onComplete(() => {
  console.log("JOB DONE")
})

ticker.autoTick(50)

// interface ISomething {

// }

// class ISomethingBase implements ISomething {
//   constructor () {}
// }

// class s extends ISomethingBase {
//   constructor () {
//     super()
//     console.log ('wewadwa')
//   }
// }

// let arr:typeof ISomethingBase[] = [s]

// new arr[0]()
