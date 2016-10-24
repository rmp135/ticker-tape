import * as sample from 'lodash/sample'

export function generateDefaultCharacterSet (): string[] {
  let charSet = [];
  for (let i = 33; i < 126; i++) {
    charSet.push(String.fromCharCode(i));
  }
  return charSet;
}

export function generateWordFromCharacterSet (length: number, characterSet: string[]) {
  let word = [];
  for (let i = 0; i < length; i++) {
    word.push(sample(characterSet))
  }
  return word.join("");
}