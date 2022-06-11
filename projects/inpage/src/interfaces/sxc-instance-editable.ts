import { Sxc } from '../../../$2sxc/src';
import { Cms } from '../cms/Cms';
import { ensureRunParamsInstanceOrError, RunParams } from '../commands/engine/run-params';


/**
 * @internal
 */
export class SxcEdit extends Sxc {
    /// TODO: CONTINUE HERE, TRY TO GET THE RUN TO USE THE CURRENT 2SXC
    run<T>(runParams: RunParams): Promise<void | T> {
        ensureRunParamsInstanceOrError(runParams);
        return new Cms().run({ ...runParams, context: this });
    }
}
