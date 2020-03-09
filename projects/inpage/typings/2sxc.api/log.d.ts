export declare class Log {
    name: string;
    text: string;
    entries: LogEntry[];
    start: number;
    constructor(name: string, message: string);
    add(message: string): void;
}
declare class LogEntry {
    time: number;
    message: string;
}
export {};
