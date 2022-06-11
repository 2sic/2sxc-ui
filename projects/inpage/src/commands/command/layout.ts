import { CmsEngine } from '..';
import { QeSelectors } from '../../quick-edit';
import { ContextForLists } from '../../quick-edit/context-for-lists';
import { SxcTools } from '../../sxc/sxc-tools';
import { Commands } from '../commands';

/**
 * @internal
 */
export const CmdLayout = 'layout';
/**
 * import this module to commands.ts
 */
Commands.add(CmdLayout, 'ChangeLayout', 'glasses', true, true, {

    inlineWindow: (_) => true,

    code(context, event) {
        // console.log('layout');
        // Try to find the closest tag based on the click
        // if this fails, try to find it based on the sxc-instance
        const attrSel = '[' + QeSelectors.blocks.cb.context + ']';
        // note: sometimes when the page loads, this can be auto-triggered and not have an event
        const listSpecs = SxcTools.getTag(context.sxc).closest<HTMLElement>(attrSel);

        // Now check if we have apps-parameters to pass on
        if (listSpecs) {
            const specs = ContextForLists.getFromDom(listSpecs);
            context.button.command.params.apps = specs.apps;
        }
        return CmsEngine.openDialog(context, event);
    },
});
