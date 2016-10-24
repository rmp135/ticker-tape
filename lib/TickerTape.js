"use strict";
var TickerTape = (function () {
    function TickerTape(props) {
        this.events = {
            onUpdate: [],
            beforeUpdate: [],
            onComplete: []
        };
        this.scrambler = props.scrambler;
        if (typeof props.el === "string") {
            this.el = document.querySelector(props.el);
        }
        else {
            this.el = props.el;
        }
    }
    Object.defineProperty(TickerTape.prototype, "CurrentWord", {
        get: function () {
            return this.scrambler.CurrentWord;
        },
        enumerable: true,
        configurable: true
    });
    TickerTape.prototype.runAllCallbacks = function (funs) {
        for (var _i = 0, funs_1 = funs; _i < funs_1.length; _i++) {
            var fun = funs_1[_i];
            fun(this);
        }
    };
    TickerTape.prototype.tick = function () {
        this.runAllCallbacks(this.events.beforeUpdate);
        this.scrambler.tick();
        if (this.el) {
            this.el.innerHTML = this.scrambler.CurrentWord;
        }
        this.runAllCallbacks(this.events.onUpdate);
        if (this.scrambler.HasCompleted) {
            this.runAllCallbacks(this.events.onComplete);
        }
    };
    TickerTape.prototype.autoTick = function (time) {
        time = time || 100;
        this.tick();
        if (this.scrambler.HasCompleted) {
            return;
        }
        setTimeout(this.autoTick.bind(this, [time]), time);
    };
    TickerTape.prototype.preUpdate = function (callback) {
        this.events.onUpdate.push(callback);
        return this;
    };
    TickerTape.prototype.postUpdate = function (callback) {
        this.events.beforeUpdate.push(callback);
        return this;
    };
    TickerTape.prototype.onComplete = function (callback) {
        this.events.onComplete.push(callback);
        return this;
    };
    return TickerTape;
}());
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = TickerTape;
