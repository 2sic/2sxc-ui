import { ContextBundleToolbar } from '../../context/bundles/context-bundle-toolbar';
import { RenderPart } from './render-part-base';
import { ToolbarRenderer } from './toolbar-renderer';

export class RenderButtonGroups extends RenderPart {
  constructor(parent: ToolbarRenderer) { super(parent); }

  render(context: ContextBundleToolbar): HTMLElement[] {
    const groupsBuffer: HTMLElement[] = []; // temporary storage for detached HTML DOM objects
    const btnGroups = context.toolbar.groups;
    for (let i = 0; i < btnGroups.length; i++) {
      const btns = btnGroups[i].buttons;
      for (let h = 0; h < btns.length; h++) {
        const btnContext = context.forButton(btns[h]);
        // create one button
        const button = this.parent.button.render(btnContext, i);
        // add button to group of buttons
        const item = document.createElement('li');
        item.appendChild(button);
        groupsBuffer.push(item);
      }
    }
    return groupsBuffer;
  }
}
