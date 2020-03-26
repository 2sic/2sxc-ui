﻿import { Obj } from '../plumbing';
import { Log } from './log';

export class Entry {

    public result: string;

    private _data?: unknown;
    get data(): unknown {
        return this._data;
    }
    set data(data: unknown) {
        if (data === undefined) return;
        if (this.log.logData())
            this._data = Obj.DeepClone(data);
    }

    public source = (): string => this.log.fullIdentifier();

    constructor(
        private log: Log,
        public message: string,
        public depth: number,
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
