import ScramblerInterface from './ScramblerInterface';
export interface BasescramblerOptions {
    charSet?: string[];
    startingWord?: string;
}
export default class BaseScrambler implements ScramblerInterface {
    protected currentWord: string[];
    protected characterSet: string[];
    protected targetWord: string;
    HasCompleted: boolean;
    readonly CurrentWord: string;
    constructor(targetWord: string, props: BasescramblerOptions);
    tick(): void;
}
