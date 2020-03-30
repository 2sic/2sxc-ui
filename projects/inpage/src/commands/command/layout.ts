import { CmsEngine } from '..';
import { SxcEdit } from '../../interfaces/sxc-instance-editable';
import { QeSelectors } from '../../quick-edit';
import { ContextForLists } from '../../quick-edit/context-for-lists';
import { Commands } from '../commands';

export const CmdLayout = 'layout';
/**
 * import this module to commands.ts
 */
Commands.add(CmdLayout, 'ChangeLayout', 'glasses', true, true, {

    inlineWindow: (_) => true,

    code(context, event) {
        // Try to find the closest tag based on the click
        // if this fails, try to find it based on the sxc-instance
        const attrSel = '[' + QeSelectors.blocks.cb.context + ']';
        let listSpecs = $(event.target).closest(attrSel);
        if (listSpecs.length === 0) listSpecs = $(SxcEdit.getTag(context.sxc)).closest(attrSel);

        // Now check if we have apps-parameters to pass on
        if (listSpecs.length > 0) {
           const specs = ContextForLists.getFromDom(listSpecs);
           context.button.command.params.apps = specs.apps;
        }
        return CmsEngine.openDialog(context, event);
    },
});
