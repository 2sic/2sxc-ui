﻿import { ContextBundleToolbar } from '../../context/bundles/context-bundle-toolbar';
import { ButtonGroup } from '../config';
import { RenderPart } from './render-part-base';
import { ToolbarRenderer } from './toolbar-renderer';

export class RenderButtonGroups extends RenderPart {
    constructor(parent: ToolbarRenderer) {
        super(parent, 'Rnd.Groups');
    }

    render(context: ContextBundleToolbar): HTMLElement[] {
        const cl = this.log.call('render');
        const tags: HTMLElement[] = []; // temporary storage for detached HTML DOM objects
        const btnGroups = context.toolbar.groups;

        for (let i = 0; i < btnGroups.length; i++)
            tags.concat(this.renderGroup(btnGroups[i], context, i));

        return cl.return(tags);
    }

    private renderGroup(group: ButtonGroup, context: ContextBundleToolbar, groupNumber: number): HTMLElement[] {
        const cl = this.log.call('renderGroup', `group #${groupNumber}`);
        const tags: HTMLElement[] = []; // temporary storage for detached HTML DOM objects
        const btns = group.buttons;
        for (let h = 0; h < btns.length; h++) {
            const btnContext = context.forButton(btns[h]);
            const tag = this.parent.button.render(btnContext, groupNumber);
            // add button to group of buttons
            const item = document.createElement('li');
            item.appendChild(tag);
            tags.push(item);
        }
        return cl.return(tags);
    }
}
