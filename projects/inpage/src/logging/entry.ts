import { Log } from './log';

export class Entry {


  public source = ():string => this.log.fullIdentifier();

  constructor(private log: Log, public message: string)
  {
  }

}
