import * as sample from 'lodash/sample'
import BaseScrambler from './BaseScrambler'
import { BasescramblerOptions } from './BaseScrambler'
import { generateDefaultCharacterSet, generateWordFromCharacterSet } from './Helper'

interface UnscramblerOptions extends BasescramblerOptions {
    cyclesPerChar?: number;
}

export default class Unscrambler extends BaseScrambler {
  private currentCycle : number;
  private currentLetter: number;
  private cyclesPerChar: number;
  constructor (targetWord: string, props: UnscramblerOptions) {
    super(targetWord, props);
    let options = {
      cyclesPerChar: 10,
    }
    Object.assign(options, props)
    this.cyclesPerChar = options.cyclesPerChar;
    this.currentLetter = 0;
    this.currentCycle = 0;
  }
  tick () {
    if (this.currentCycle === this.cyclesPerChar) {
      this.currentWord[this.currentLetter] = this.targetWord.charAt(this.currentLetter)
      this.currentCycle = 0;
      this.currentLetter++;
    }
    else {
      this.currentWord[this.currentLetter] = sample(this.characterSet);
      this.currentCycle++;
    }
    if (this.currentLetter === Math.max(this.targetWord.length, this.currentWord.length)) {
      this.HasCompleted = true;
    }

  }
}