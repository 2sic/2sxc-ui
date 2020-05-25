import { CmsEngine, Commands } from '..';
import { SharedLogic } from './shared-logic';

export const CmdNew = 'new';
export const CmdNewMode = 'new';

/**
 * new is a dialog to add something, and will not add if cancelled
 * new can also be used for mini-toolbars which just add an entity not attached to a module
 * in that case it's essential to add a contentType like
 * <ul class="sc-menu" data-toolbar='{"action":"new", "contentType": "Category"}'></ul>
 *
 * import this module to commands.ts
 */
Commands.add(CmdNew, 'New', 'plus', false, true, {
    addParamsToLink: (_) => ({ mode: CmdNewMode }),

    dialog: (_) => 'edit', // don't use "new" (default) but use "edit"

    showCondition(context) {
        // don't provide new if type unknown or on the header-item
        return  !!context.button.command.params.contentType || SharedLogic.isList(context);
    },
    code(context, event) {
        // todo - should refactor this to be a toolbarManager.contentBlock command
        context.button.command.params.sortOrder = context.button.command.params.sortOrder + 1;
        return CmsEngine.openDialog(context, event);
    },
});
