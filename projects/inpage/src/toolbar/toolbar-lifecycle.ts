import { ToolbarEventArguments } from '.';
import { C } from '../constants';
import { ContextComplete } from '../context';
import { WorkflowManager } from '../workflow';

export class ToolbarLifecycle {

    /**
     * This will be triggered when a hover toolbar has been built,
     * so that on-page JS can register workflows for this toolbar.
     * @static
     * @param {HTMLElement} toolbarElement The toolbar HTML DOM passed into the event
     * @param {HTMLElement} anchoredElement The DOM element which had the @Edit.TagToolbar(...) - on which the event will be raised
     * @param {ContextComplete} context The toolbar context
     * @memberof ToolbarLifecycle
     */
    static raiseToolbarInitEvent(toolbarElement: HTMLElement, anchoredElement: HTMLElement, context: ContextComplete) {
        const commandWorkflow = new WorkflowManager(null);
        commandWorkflow.attach(toolbarElement, context);

        const event = new CustomEvent(C.Toolbar.eventNames.onInit, {
            detail: {
                // type: ToolbarTypes.tag,
                element: toolbarElement,
                identifier: context.toolbar?.identifier,
                workflow: commandWorkflow,
            } as ToolbarEventArguments,
        });
        anchoredElement?.dispatchEvent(event);
    }
}
