import { Obj } from '../plumbing';
import { Log } from '.';

/**
 * A log entry item
 * @export
 * @interface LogEntry
 */
export class LogEntry {

    /**
     * The result of an operation - treated differently in the output
     * @internal
     */
    public result: string;


    /**
     * Data which is logged - if data-logging is enabled
     * @internal
     */
    get data(): unknown {
        return this._data;
    }
    /** @internal */
    set data(data: unknown) {
        if (data === undefined) return;
        if (this.log.logData())
            this._data = Obj.DeepClone(data, true);
    }
    /** @internal */
    private _data?: unknown;

    /** @internal */
    public source = (): string => this.log.fullIdentifier();

    /** @internal */
    constructor(
        /** @internal */
        private log: Log,
        public message: string,
        /** @internal */
        public depth: number,
        /** A timestamp for this entry to better see sequences of things happening */
        public time: number,
        data?: unknown,
        ) {
            if (data) {
                // #2492 - jQuery isn't used any more in 2sxc
                // if (data instanceof jQuery) {
                //     const jq = data as JQuery;
                //     this.data = {
                //         isJQuery: true,
                //         original: jq,
                //         html: jq.length && jq[0].outerHTML,
                //     };
                // } 
                // else
                    this.data = data;
            }
    }

}
