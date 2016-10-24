import BaseScrambler from './BaseScrambler';
import { BasescramblerOptions } from './BaseScrambler';
export interface UnscramblerOptions extends BasescramblerOptions {
    cyclesPerChar?: number;
}
export default class Unscrambler extends BaseScrambler {
    private currentCycle;
    protected currentLetter: number;
    private cyclesPerChar;
    constructor(targetWord: string, props: UnscramblerOptions);
    tick(): void;
}
