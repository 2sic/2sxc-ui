import { Cms } from '../../cms/Cms';
import { SxcEdit } from '../../interfaces/sxc-instance-editable';
import { CommandParams } from '../command-params';
import { ContextBundleButton } from '../../context/bundles/context-bundle-button';

/**
 * This is an engine on the sxc object. 
 * It provides a .run(...) for when the sxc is already known.
 */
export class SxcInstanceEngine {
  constructor(private sxc: SxcEdit) {}

  run<T>(
    nameOrSettings: string | CommandParams,
    eventOrSettings?: CommandParams | MouseEvent,
    event?: MouseEvent,
  ): Promise<void | T> {
    const cntx = ContextBundleButton.findContext(this.sxc);
    return new Cms().run(cntx, nameOrSettings, eventOrSettings, event);
  }
}
