import ScramblerInterface from './ScramblerInterface'
import { generateDefaultCharacterSet, generateWordFromCharacterSet } from './Helper'

export interface BasescramblerOptions {
  charSet?: string[];
  startingWord?: string;
}

export default class BaseScrambler implements ScramblerInterface {
  protected currentWord: string[];
  protected characterSet: string[];
  protected targetWord: string;
  public HasCompleted: boolean;
  get CurrentWord () : string {
    return this.currentWord.join("");
  }
  constructor (targetWord: string, props: BasescramblerOptions) {
    let options = {
      charSet: generateDefaultCharacterSet(),
      startingWord: ""
    }
    options.startingWord = generateWordFromCharacterSet(targetWord.length, options.charSet)
    Object.assign(options, props)
    this.targetWord = targetWord;
    this.characterSet = options.charSet;
    this.currentWord = options.startingWord.split("");
    this.HasCompleted = false;
  }
  tick () {
    this.currentWord = this.targetWord.split("");
    this.HasCompleted = true;
  }
}

