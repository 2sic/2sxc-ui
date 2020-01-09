export class Log {
  name: string;
  text = "";
  entries: LogEntry[] = [];
  start: number;

  constructor(name: string, message: string) {
    this.name = name;
    this.start = new Date().getTime();
    if(message) this.add(message);
  }

  add(message: string) {
    this.text += message + '\n';
    this.entries.push({time: new Date().getTime() - this.start, message: message} as LogEntry);
  }
}


class LogEntry {
  time: number;
  message: string;
}