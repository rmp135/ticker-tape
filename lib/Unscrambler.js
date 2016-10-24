"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var sample = require('lodash/sample');
var BaseScrambler_1 = require('./BaseScrambler');
var Unscrambler = (function (_super) {
    __extends(Unscrambler, _super);
    function Unscrambler(targetWord, props) {
        _super.call(this, targetWord, props);
        var options = {
            cyclesPerChar: 10,
        };
        Object.assign(options, props);
        this.cyclesPerChar = options.cyclesPerChar;
        this.currentLetter = 0;
        this.currentCycle = 0;
    }
    Unscrambler.prototype.tick = function () {
        if (this.currentCycle === this.cyclesPerChar) {
            this.currentWord[this.currentLetter] = this.targetWord.charAt(this.currentLetter);
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
    };
    return Unscrambler;
}(BaseScrambler_1.default));
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Unscrambler;
