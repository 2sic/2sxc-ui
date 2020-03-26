import * as Public from '../../../sxc-typings/index';
import { Log } from '.';

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