"use strict";
var Helper_1 = require('./Helper');
var BaseScrambler = (function () {
    function BaseScrambler(targetWord, props) {
        var options = {
            charSet: Helper_1.generateDefaultCharacterSet(),
            startingWord: ""
        };
        options.startingWord = Helper_1.generateWordFromCharacterSet(targetWord.length, options.charSet);
        Object.assign(options, props);
        this.targetWord = targetWord;
        this.characterSet = options.charSet;
        this.currentWord = options.startingWord.split("");
        this.HasCompleted = false;
    }
    Object.defineProperty(BaseScrambler.prototype, "CurrentWord", {
        get: function () {
            return this.currentWord.join("");
        },
        enumerable: true,
        configurable: true
    });
    BaseScrambler.prototype.tick = function () {
        this.currentWord = this.targetWord.split("");
        this.HasCompleted = true;
    };
    return BaseScrambler;
}());
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = BaseScrambler;
