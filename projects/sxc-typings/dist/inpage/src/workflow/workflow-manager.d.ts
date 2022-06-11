import { WorkflowStep } from '.';
import { ContextComplete } from '../context';
import { HasLog, Log } from '../logging';
/**
 * A workflow manager which will run stuff before / after commands.
 * As of now, it must be attached to a toolbar to take effect.
 * Normally the toolbar with raise a `toolbar-init` event where you can then add steps.
 */
export declare class WorkflowManager extends HasLog {
    private isDummy;
    /** The workflow steps registered here */
    steps: WorkflowStep[];
    constructor(parentLog: Log, isDummy?: boolean);
    /**
     * Add one or many steps to the workflow
     */
    add(steps: WorkflowStep | WorkflowStep[]): void;
    /**
     * Attach a workflow to a toolbar
     */
    attach(node: HTMLElement, context: ContextComplete): void;
}
