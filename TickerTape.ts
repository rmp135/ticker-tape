import BaseScrambler from './BaseScrambler'
import { generateDefaultCharacterSet } from './Helper'
import Unscrambler from './Unscrambler'

interface TickerOptions {
  word: string;
  scrambler?: string | typeof BaseScrambler;
  scramblerOptions?: any;
  el?: Element | string;
}

interface CallbackFunction {
  (context: TickerTape) : void;
}

export default class TickerTape {
  private scrambler : BaseScrambler;
  private el: Element;
  private events: {
    onUpdate: CallbackFunction[],
    beforeUpdate: CallbackFunction[],
    onComplete: CallbackFunction[]
  }
  get CurrentWord () : String {
    return this.scrambler.CurrentWord;
  }
  constructor (props: TickerOptions) {
    this.events = {
      onUpdate: [],
      beforeUpdate: [],
      onComplete: []
    };

    if (typeof props.word !== "string" ) {
      throw new Error("Options value [word] must be a string.");
    }

    if (props.scrambler == null) {
      props.scrambler = "unscrambler"
    }

    if (typeof props.scrambler === "string") {
      switch (props.scrambler) {
        case "unscrambler": {
          props.scrambler = Unscrambler
        }
        default: {
          props.scrambler = Unscrambler
        }
      }
    }

    this.scrambler = new props.scrambler(props.word, props.scramblerOptions)

    if (typeof props.el === "string") {
      this.el = document.querySelector(props.el);
    }
    else {
      this.el = props.el;
    }

  }
  private runAllFunctions(funs: Function[]) {
    for (let fun of funs) {
      fun(this)
    }
  }
  tick () {
    this.runAllFunctions(this.events.beforeUpdate);
    this.scrambler.tick();
    if (this.el) {
      this.el.textContent = this.scrambler.CurrentWord;
    }
    this.runAllFunctions(this.events.onUpdate);
    if (this.scrambler.HasCompleted) {
      this.runAllFunctions(this.events.onComplete)
    }
  }
  autoTick (time: number) {
    time = time || 100
    this.tick()
    if (this.scrambler.HasCompleted) { return }
    setTimeout(this.autoTick.bind(this, [time]), time)
  }
  onUpdate (callback: CallbackFunction) {
    this.events.onUpdate.push(callback);
  }
  beforeUpdate (callback: CallbackFunction) {
    this.events.beforeUpdate.push(callback);
  }
  onComplete (callback: CallbackFunction) {
    this.events.onComplete.push(callback);
  }
}