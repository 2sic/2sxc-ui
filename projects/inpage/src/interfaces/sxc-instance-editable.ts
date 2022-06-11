import { Sxc } from '../../../$2sxc/src';
import { Cms } from '../cms/Cms';
import { RunParams } from '../cms/run-params';
import { RunParamsHelpers } from '../cms/run-params-helpers';


/**
 * @internal
 */
export class SxcEdit extends Sxc {
    /// TODO: CONTINUE HERE, TRY TO GET THE RUN TO USE THE CURRENT 2SXC
    run<T>(runParams: RunParams): Promise<void | T> {
        RunParamsHelpers.ensureRunParamsInstanceOrError(runParams);
        return new Cms().run({ ...runParams, context: this });
    }
}
