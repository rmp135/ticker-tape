import { generateDefaultCharacterSet } from './Helper'
import ScramblerInterface from './ScramblerInterface'

export interface TickerOptions {
  scrambler: ScramblerInterface;
  el?: Element | string;
}

export interface CallbackFunction {
  (context: TickerTape): void;
}

export default class TickerTape {
  private scrambler: ScramblerInterface;
  private el: Element;
  private events: {
    onUpdate: CallbackFunction[],
    beforeUpdate: CallbackFunction[],
    onComplete: CallbackFunction[]
  }

  get CurrentWord (): String {
    return this.scrambler.CurrentWord;
  }

  constructor (props: TickerOptions) {
    this.events = {
      onUpdate: [],
      beforeUpdate: [],
      onComplete: []
    };
    this.scrambler = props.scrambler;
    if (typeof props.el === "string") {
      this.el = document.querySelector(props.el);
    }
    else {
      this.el = props.el;
    }
  }

  private runAllCallbacks(funs: CallbackFunction[]) {
    for (let fun of funs) {
      fun(this)
    }
  }

  tick () {
    this.runAllCallbacks(this.events.beforeUpdate);
    this.scrambler.tick();
    if (this.el) {
      this.el.innerHTML = this.scrambler.CurrentWord;
    }
    this.runAllCallbacks(this.events.onUpdate);
    if (this.scrambler.HasCompleted) {
      this.runAllCallbacks(this.events.onComplete)
    }
  }

  autoTick (time: number) {
    time = time || 100
    this.tick()
    if (this.scrambler.HasCompleted) { return }
    setTimeout(this.autoTick.bind(this, [time]), time)
  }

  preUpdate (callback: CallbackFunction) {
    this.events.onUpdate.push(callback);
    return this;
  }

  postUpdate (callback: CallbackFunction) {
    this.events.beforeUpdate.push(callback);
    return this;
  }

  onComplete (callback: CallbackFunction) {
    this.events.onComplete.push(callback);
    return this;
  }
}