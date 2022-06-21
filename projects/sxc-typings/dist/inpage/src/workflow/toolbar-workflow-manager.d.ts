import { WorkflowStep } from '.';
import { HasLog } from '../core';
/**
 * A workflow manager _of a Toolbar_ which will run stuff before / after commands.
 * When toolbars are created, they will add a Manager and then raise an event for in-page code to add workflow steps.
 * Normally the toolbar with raise a `toolbar-init` event where you can then add steps.
 */
export declare class ToolbarWorkflowManager extends HasLog {
    private isDummy;
    /**
     * Register one or many [workflow-steps](xref:Api.Js.SxcJs.WorkflowStep) to the toolbar, to use if toolbar commands are executed.
     */
    add(steps: WorkflowStep | WorkflowStep[]): void;
}
