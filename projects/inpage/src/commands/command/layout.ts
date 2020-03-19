import { CmsEngine } from '..';
import { QeSelectors } from '../../quick-edit';
import { ContextForLists } from '../../quick-edit/context-for-lists';
import { Commands } from '../commands';

export const LayoutCommand = 'layout';
/**
 * import this module to commands.ts
 */
Commands.add(LayoutCommand, 'ChangeLayout', 'glasses', true, true, {
    params: (context) => {
        console.log('will layout - context:', context);
        return {}; // { mode: 'edit' };
    },

    inlineWindow: (context) => true,

    code(context, event) {
        console.log('layout - code', event.target);
        // const eventTag = event.currentTarget;
        const listSpecs = $(event.target).closest('[' + QeSelectors.blocks.cb.context + ']');
        if (listSpecs.length > 0) {
           const specs = ContextForLists.getFromDom(listSpecs);
           console.log('layout specs:', specs);
           context.button.action.params.apps = specs.apps;
        }
        return CmsEngine.openDialog(context, event);
    },
});
