import { Log } from '.';
/**
 * Any object that has an own log object
 * @export
 * @interface HasLog
 */
export declare abstract class HasLog {
    /**
     * The logger for this object
     * @type {Log}
     * @memberof HasLog
     */
    log: Log;
}
