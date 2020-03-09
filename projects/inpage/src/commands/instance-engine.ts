import { Cms } from '../cms/Cms';
import { context } from '../context/context';
import { Settings } from './settings';

export class InstanceEngine {
  constructor(private sxc: SxcInstanceWithInternals) {}

  run(
    nameOrSettings: string | Partial<Settings>,
    eventOrSettings?: Partial<Settings> | MouseEvent,
    event?: MouseEvent,
  ): Promise<any> {
    const cntx = context(this.sxc);
    return new Cms().run(cntx, nameOrSettings, eventOrSettings, event);
  }
}
