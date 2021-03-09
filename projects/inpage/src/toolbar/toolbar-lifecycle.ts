import { ToolbarEventArguments } from '.';
import { C } from '../constants';
import { ContextComplete } from '../context';
import { WorkflowManager } from '../workflow';

export class ToolbarLifecycle {
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
