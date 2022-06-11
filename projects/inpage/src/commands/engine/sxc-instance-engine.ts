﻿import { Sxc } from '../../../../$2sxc/src';
import { Cms } from '../../cms/Cms';
import { ContextComplete } from '../../context/bundles/context-bundle-button';
import { CommandParams } from '../command-params';
import { RunParamsWithContext } from './run-params';

/**
 * This is an engine on the sxc object.
 * It provides a .run(...) for when the sxc is already known.
 * @internal
 */
export class SxcInstanceEngine {
  constructor(private sxc: Sxc) {}

  run<T>(
    nameOrSettings: string | CommandParams,
    eventOrSettings?: CommandParams | MouseEvent,
    event?: MouseEvent,
  ): Promise<void | T> {
    // Capture cases where this is called using the new/modern params, which is a mistake
    if ((nameOrSettings as RunParamsWithContext).context || (nameOrSettings as RunParamsWithContext).workflows)
      throw "You are calling '.manage.run(...)' with a parameter 'context'. You should probably be calling the new '.cms.run(...)' instead.";
    const cntx = ContextComplete.findContext(this.sxc);
    return new Cms().run(cntx, nameOrSettings, eventOrSettings, event);
  }
}
