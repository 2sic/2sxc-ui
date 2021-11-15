import { CmdEditDialog, CmsEngine, Commands } from '..';
import { SharedLogic } from './shared-logic';

export const CmdNew = 'new';
export const CmdNewMode = 'new';

/**
 * 'new' is a dialog to add something, and will not add if cancelled
 * new can also be used for mini-toolbars which just add an entity not attached to a module
 * in that case it's essential to add a contentType like
 * <ul class="sc-menu" data-toolbar='{"action":"new", "contentType": "Category"}'></ul>
 *
 * import this module to commands.ts
 */
Commands.add(CmdNew, 'New', 'plus', false, true, {
    addParamsToLink: (_) => ({ mode: CmdNewMode }),

    dialog: (_) => CmdEditDialog, // don't use "new" (default) but use "edit"

    showCondition(context) {
        // don't provide new if type unknown or on the header-item
        return  !!context.button.command.params.contentType || SharedLogic.isList(context);
    },

    code(context, event) {
        const params = context.button.command.params;
        // todo - should refactor this to be a toolbarManager.contentBlock command
        params.sortOrder = params.sortOrder + 1;

        // if we have an EntityId, this means that it picked up id/guid from the current item,
        // so we must reset both EntityId and EntityGuid
        // note that we don't reset this if entityId = 0, because that usually means the guid was preset on purpose
        if (params.entityId && params.entityId !== 0) {
            delete params.entityId;
            delete params.entityGuid;
        }

        // if we have useModuleList AND contentType then something is inconsistent
        // since useModuleList doesn't need to specify the contentType
        // this means that it's a custom new button, and useModuleList is wrong.
        if (params.useModuleList && params.contentType)
            delete params.useModuleList;

        // done
        return CmsEngine.openDialog(context, event);
    },
});
