import { Sxc } from '../../../$2sxc/src';
import { RunParams } from '../../../$2sxc/src/cms/run-params';
import { Cms } from '../cms/Cms';
import { ensureRunParamsInstanceOrError } from '../commands/engine/run-params';


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
