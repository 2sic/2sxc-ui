import { WorkflowPhases } from '.';
import { ContextComplete } from '../context';


export class WorkflowStepArguments {
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
