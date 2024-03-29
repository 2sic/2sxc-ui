import { RunParams } from '../../../$2sxc/src/cms/run-params';
import { WorkflowStep } from '../workflow';

/**
 * Special internal interface to give workflows a more specific type
 * @internal
 */
export interface RunParamsWithWorkflows extends RunParams {
    /**
     * Workflows work the same way as with a toolbar, except that they are added here and not registered on init
     */
    workflows?: WorkflowStep | WorkflowStep[];
}
