"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Unscrambler_1 = require('./Unscrambler');
var default_1 = (function (_super) {
    __extends(default_1, _super);
    function default_1(targetWord, props) {
        _super.call(this, targetWord, props);
        var options = {
            className: "currentLetter"
        };
        Object.assign(options, props);
        this.className = options.className;
    }
    Object.defineProperty(default_1.prototype, "CurrentWord", {
        get: function () {
            return this.currentWord
                .slice(0, this.currentLetter)
                .concat("<span class=" + this.className + ">" + (this.currentWord[this.currentLetter] || "") + "</span>")
                .concat(this.currentWord.slice(this.currentLetter + 1, this.currentWord.length)).join("");
        },
        enumerable: true,
        configurable: true
    });
    return default_1;
}(Unscrambler_1.default));
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = default_1;
