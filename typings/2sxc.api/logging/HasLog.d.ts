import { Log } from './Log';
export declare abstract class HasLog {
    constructor(name: string, message?: string);
    log: Log;
}
