## ticker-tape

[](http://i.imgur.com/wrgYK11.gifv)

A small project in TypeScript to make a cool looking text unscrambler.

```javascript
import { TickerTape, Unscrambler } from "ticker-tape";

new TickerTape({
  el: "#someelement",
  scrambler: new Unscrambler("some word", {})
})
.onComplete(() => {
  console.log("Completed.");
});

ticker.autoTick(50);
```
The `el` property will have it's `innerHTML` replaced with the result of the scramble each tick, and can be an element or string. This is optional.

The `scrambler` property must be an object with the following properties.

`tick (): void`: Called each time the TickerTape is ticked. Perform updates here.

`CurrentWord: string`: The current word. Note that internally this is stored as an array so it must be joined together again.

`HasCompleted: boolean`: Whether the ticker has completed.

---

The TickerTape constructor returns an object with a number of functions.

`CurrentWord: string`: Returns the current word.

`tick (): void` Ticks the scrambler.

`autoTick (time: number)` : will  automatically tick the scrambler every `time` miliseconds.

`preUpdate (f: context => TickerTape)`: Called before the scrambler is ticked. Returns the current TickerTape and provides the `this` context as an argument.

`postUpdate (f: context => TickerTape)`: Called after the scrambler is ticked. Returns the current TickerTape and provides the `this` context as an argument.

`onComplete (f: context => TickerTape)`: Called when the scrambler as completed scrambling. Returns the current TickerTape and provides the `this` context as an argument.

---
Comes provided with a couple of example scramblers.

**BaseScrambler**

Doesn't do much of anything, made for building upon. 

`new BaseScrambler(word: string, { startingWord: string, charSet: string[] })`

`startingWord`: The starting word to scramble. If omitted, one will be generated at random using the `charSet`.

`charSet`: The character set to go use. If omitted, one will be randomly created.

**Unscrambler**

Goes through each character, updating them one at a time.

`new Unscrambler(word: string, { cyclesPerChar: number })`

`cyclesPerChar`: The number of cycles per character before the correct one is found. Defaults to 10.

All props from BaseScrambler are allowed and will default in the same way.

**StyledUnscrambler**

As above but will wrap the current character in a `<span>` and apply a class.

`new StyledUnscrambler(word, { className: string })`

`className`: The name of the class to apply. Defaults to "currentLetter".

All props from Unscrambler and BaseScrambler are allowed and will default in the same way.

---

Precompiled files can be found as `lib/main.js` and `lib.main.min.js`.