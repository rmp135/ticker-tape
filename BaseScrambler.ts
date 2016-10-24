import { generateDefaultCharacterSet, generateWordFromCharacterSet } from './Helper'

export default class BaseScrambler {
  protected currentWord: string[];
  protected characterSet: string[];
  protected targetWord: string;
  public HasCompleted: boolean;
  get CurrentWord () : string {
    return this.currentWord.join("");
  }
  constructor (targetWord: string, props: any) {
    let options = {
      charSet: generateDefaultCharacterSet(),
      startingWord: ""
    }
    options.startingWord = generateWordFromCharacterSet(targetWord.length, options.charSet)
    Object.assign(options, props)
    this.characterSet = options.charSet;
    this.currentWord = options.startingWord.split("");
    this.HasCompleted = false;
  }
  tick () {
    this.currentWord = this.targetWord.split("");
    this.HasCompleted = true;
  }
}