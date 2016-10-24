import Unscrambler from './Unscrambler'
import { UnscramblerOptions } from './Unscrambler'

export interface StyledUnscramblerOptions extends UnscramblerOptions {
  className?: string
}

export default class extends Unscrambler {
  private className: string
  constructor (targetWord: string, props: StyledUnscramblerOptions ) {
    super(targetWord, props);
    let options = {
      className: "currentLetter"
    };
    Object.assign(options, props);
    this.className = options.className;
  }
  get CurrentWord () {
    return this.currentWord
      .slice(0, this.currentLetter)
      .concat(`<span class=${this.className}>${this.currentWord[this.currentLetter] || ""}</span>`)
      .concat(this.currentWord.slice(this.currentLetter+1, this.currentWord.length)).join("")
  }
}