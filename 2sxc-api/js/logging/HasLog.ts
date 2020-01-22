import * as I from '../../../typings/index';
import { Log } from './Log';

export abstract class HasLog implements I.HasLog {
    constructor(name: string, message?: string) {
        this.log = new Log(name, message);
    }


    /**
     * The logger for this object
     * @type {Log}
     * @memberof HasLog
     */
    log: Log;
}