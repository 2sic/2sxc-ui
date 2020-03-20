import * as Public from '../../../sxc-typings/index';

export class LogEntry implements Public.LogEntry {
    time: number;
    message: string;
    data: any;
}
