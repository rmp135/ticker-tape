import Unscrambler from './Unscrambler';
import { UnscramblerOptions } from './Unscrambler';
export interface StyledUnscramblerOptions extends UnscramblerOptions {
    className?: string;
}
export default class  extends Unscrambler {
    private className;
    constructor(targetWord: string, props: StyledUnscramblerOptions);
    readonly CurrentWord: string;
}
