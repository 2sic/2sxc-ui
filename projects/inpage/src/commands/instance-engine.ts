import { Cms } from '../cms/Cms';
import { context } from '../context/context';
import { SxcIntanceEditable } from '../interfaces/sxc-instance-editable';
import { Settings } from './settings';

// export interface runFunction {
//     (
//         nameOrSettings: string | Partial<Settings>,
//         eventOrSettings?: Partial<Settings> | MouseEvent,
//         event?: MouseEvent,
//       ): Promise<any>;
// }

export class InstanceEngine {
  constructor(private sxc: SxcIntanceEditable) {}

  run(
    nameOrSettings: string | Partial<Settings>,
    eventOrSettings?: Partial<Settings> | MouseEvent,
    event?: MouseEvent,
  ): Promise<any> {
    const cntx = context(this.sxc);
    return new Cms().run(cntx, nameOrSettings, eventOrSettings, event);
  }
}
