import { CmsEngine, CommandNames, Commands } from '..';
import { CommandContentTypeParams } from './command-content-type';
import { SharedLogic } from './shared-logic';

/**
 * 'new' is a dialog to add something, and will not add if cancelled
 * new can also be used for mini-toolbars which just add an entity not attached to a module
 * in that case it's essential to add a contentType like
 * <ul class="sc-menu" data-toolbar='{"action":"new", "contentType": "Category"}'></ul>
 *
 * import this module to commands.ts
 * @internal
 */
Commands.add(CommandNames.new, 'New', 'plus', false, true, {
    addParamsToLink: (_) => ({ mode: CommandNames.newMode }),

    dialog: (_) => CommandNames.edit, // don't use "new" (default) but use "edit"

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

/**
 * Parameters used for the command `new`
 * <br>
 * The ContentType name determines what kind of item will be created.
 * <br>
 * ⤴️ back to [All Command Names](xref:Api.Js.SxcJs.CommandNames)
 */
// tslint:disable-next-line: no-empty-interface
export interface CommandNewParams extends CommandContentTypeParams {

}
