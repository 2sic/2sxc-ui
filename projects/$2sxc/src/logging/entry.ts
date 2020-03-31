import { Obj } from '../plumbing';
import { Log } from '.';

export class Entry {

    /** The result of an operation - treated differently in the output */
    public result: string;


    /** Data which is logged - if data-logging is enabled */
    get data(): unknown {
        return this._data;
    }
    set data(data: unknown) {
        if (data === undefined) return;
        if (this.log.logData())
            this._data = Obj.DeepClone(data, true);
    }
    private _data?: unknown;

    public source = (): string => this.log.fullIdentifier();

    constructor(
        private log: Log,
        public message: string,
        public depth: number,
        /** A timestamp for this entry to better see sequences of things happening */
        public time: number,
        data?: unknown,
        ) {
            if (data) {
                if (data instanceof jQuery) {
                    const jq = data as JQuery;
                    this.data = {
                        isJQuery: true,
                        original: jq,
                        html: jq.length && jq[0].outerHTML,
                    };
                } else
                    this.data = data;
            }
    }

}
