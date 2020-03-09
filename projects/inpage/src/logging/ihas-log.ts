import { Log } from './log';

export interface IHasLog {

  log: Log;
  linkLog(parentLog: Log) : void;
  
}