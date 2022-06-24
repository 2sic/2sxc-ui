import { CommandParams } from '../../../$2sxc/src/cms/command-params';
import { ContextComplete } from '../context/bundles/context-bundle-button';

/**
 * @internal
 */
export class CmdParHlp {
  static getIndex(params: CommandParams | ContextComplete) {
    const realParams = (ContextComplete.is(params)) ? params.button.command.params : params;
    return realParams.index ?? realParams.sortOrder;
  }
}