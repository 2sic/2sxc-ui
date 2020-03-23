import { Log } from './log';

export class Entry {

    // public depth: number = 0;

    public result: string;

    public source = (): string => this.log.fullIdentifier();

    constructor(private log: Log, public message: string, public depth: number) {
    }

}
