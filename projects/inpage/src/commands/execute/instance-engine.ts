import { Cms } from '../../cms/Cms';
import { findContext } from '../../context/context';
import { SxcIntanceEditable } from '../../interfaces/sxc-instance-editable';
import { CommandParams } from '../command-params';

export class InstanceEngine {
  constructor(private sxc: SxcIntanceEditable) {}

  run<T>(
    nameOrSettings: string | Partial<CommandParams>,
    eventOrSettings?: Partial<CommandParams> | MouseEvent,
    event?: MouseEvent,
  ): Promise<void | T> {
    const cntx = findContext(this.sxc);
    return new Cms().run(cntx, nameOrSettings, eventOrSettings, event);
  }
}
