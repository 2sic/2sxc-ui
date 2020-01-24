import * as Public from '../../../typings/index';
import { Log } from './Log';

export abstract class HasLog implements Public.HasLog {
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