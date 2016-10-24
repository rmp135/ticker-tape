"use strict";
var sample = require('lodash/sample');
function generateDefaultCharacterSet() {
    var charSet = [];
    for (var i = 33; i < 126; i++) {
        charSet.push(String.fromCharCode(i));
    }
    return charSet;
}
exports.generateDefaultCharacterSet = generateDefaultCharacterSet;
function generateWordFromCharacterSet(length, characterSet) {
    var word = [];
    for (var i = 0; i < length; i++) {
        word.push(sample(characterSet));
    }
    return word.join("");
}
exports.generateWordFromCharacterSet = generateWordFromCharacterSet;
