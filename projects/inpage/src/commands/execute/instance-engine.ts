import { Cms } from '../../cms/Cms';
import { context } from '../../context/context';
import { SxcIntanceEditable } from '../../interfaces/sxc-instance-editable';
import { Settings } from '../settings';

export class InstanceEngine {
  constructor(private sxc: SxcIntanceEditable) {}

  run<T>(
    nameOrSettings: string | Partial<Settings>,
    eventOrSettings?: Partial<Settings> | MouseEvent,
    event?: MouseEvent,
  ): Promise<void | T> {
    const cntx = context(this.sxc);
    return new Cms().run(cntx, nameOrSettings, eventOrSettings, event);
  }
}
