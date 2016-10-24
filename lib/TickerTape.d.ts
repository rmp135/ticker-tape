/// <reference types="core-js" />
import ScramblerInterface from './ScramblerInterface';
export interface TickerOptions {
    scrambler: ScramblerInterface;
    el?: Element | string;
}
export interface CallbackFunction {
    (context: TickerTape): void;
}
export default class TickerTape {
    private scrambler;
    private el;
    private events;
    readonly CurrentWord: String;
    constructor(props: TickerOptions);
    private runAllCallbacks(funs);
    tick(): void;
    autoTick(time: number): void;
    preUpdate(callback: CallbackFunction): void;
    postUpdate(callback: CallbackFunction): void;
    onComplete(callback: CallbackFunction): void;
}
