import { LogEntry } from './LogEntry';
export declare class Log {
    name: string;
    text: string;
    entries: LogEntry[];
    start: number;
    constructor(name: string, message: string);
    add(message: string): void;
}
