import { Cms } from '../../cms/Cms';
import { findContext } from '../../context/context';
import { SxcIntanceEditable } from '../../interfaces/sxc-instance-editable';
import { CommandParams } from '../command-params';

/**
 * This is an engine on the sxc object. 
 * It provides a .run(...) for when the sxc is already known.
 */
export class SxcInstanceEngine {
  constructor(private sxc: SxcIntanceEditable) {}

  run<T>(
    nameOrSettings: string | CommandParams,
    eventOrSettings?: CommandParams | MouseEvent,
    event?: MouseEvent,
  ): Promise<void | T> {
    const cntx = findContext(this.sxc);
    return new Cms().run(cntx, nameOrSettings, eventOrSettings, event);
  }
}
