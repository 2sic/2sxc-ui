import { WorkflowPhases } from '.';
import { ContextComplete } from '../context';


/**
 * Arguments for a workflow. Used when starting it and to determine result / cancelled.
 *
 * @export
 * @class WorkflowArguments
 */
export class WorkflowArguments {
    constructor(
        /** Name this workflow is running for */
        public command: string,

        /** The phase it's in (before, after, etc.) */
        public phase: WorkflowPhases,

        /** Context of the current command / step being run */
        public context: ContextComplete,

        /**
         * Result in after-phases of the workflow
         * BETA - never really tested this
         */
        public result: unknown = null,
        ) {

    }

    /** If the workflow should be cancelled. Can be set by any workflow step. */
    cancel: boolean = false;
}
