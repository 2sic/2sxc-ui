import { CommandParams } from '../../../$2sxc/src/cms/command-params';
import { ContextComplete } from '../context/bundles/context-bundle-button';
import { ContextHelpers } from '../context/bundles/ContextHelpers';

/**
 * @internal
 */
export class CmdParHlp {
  static getIndex(params: CommandParams | ContextComplete): number {
    const realParams = ContextHelpers.isComplete(params)
      ? params.button!.command.params!
      : params;
    return realParams.index ?? realParams.sortOrder ?? 0;
  }
}
