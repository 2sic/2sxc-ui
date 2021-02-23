import { WorkflowPhases } from './workflow-phases';


export class WorkflowArguments {
    constructor(
        /** Name this workflow is running for */
        public command: string,

        /** The phase it's in (before, after, etc.) */
        public phase: WorkflowPhases,

        /** Todo/WIP */
        public params: unknown,

        /** Result in after-phases of the workflow */
        public result: unknown = null,
        ) {

    }

    /** If the workflow should be cancelled. Can be set by any workflow step. */
    cancel: boolean = false;
}
