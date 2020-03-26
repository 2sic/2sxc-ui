// import * as Public from '../../../sxc-typings';
import { HasLog as IHasLog } from '../../../sxc-typings/index';
import { Log } from '.';

export abstract class HasLog implements IHasLog {
    constructor(name: string, parentLog?: Log, message?: string) {
        this.log = new Log(name, message);
    }


    /**
     * The logger for this object
     * @type {Log}
     * @memberof HasLog
     */
    log: Log;
}