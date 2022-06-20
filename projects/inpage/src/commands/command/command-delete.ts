import { CommandNames, Commands } from '..';
import { contentItems } from '../../entity-manipulation/item-commands';

/**
 * import this module to commands.ts
 * @internal
 */
Commands.add(CommandNames.delete, 'Delete', 'cancel', true, false, {
    // disabled: true,
    showCondition(context) {
        const p = context.button.command.params;
        // can never be used for a modulelist item, as it is always in use somewhere
        if (p.useModuleList) return false;

        // check if all data exists required for deleting
        // before 10.27, it was entityId, entityGuid and entityTitle
        // since 10.27, there will always be a guid (if it has an ID)
        // and enabling it requires an action-modifier "+delete",
        // so the automatic detection only applies
        // to the pre-10.27 custom toolbars case
        return (!!p.entityId && !!p.entityGuid && !!p.entityTitle);
    },


    code(context) {
        const p = context.button.command.params;
        const title = p.title || p.entityTitle; // prefer new title, and fallback to old for pre 10.27 configs
        return contentItems.delete(context, p.entityId, p.entityGuid, title);
    },
});

/**
 * Parameters used for the command `delete`.
 * <br>
 * ⤴️ back to [All Command Names](xref:Api.Js.SxcJs.CommandNames)
 */
export interface CommandDeleteParams {
  /**
   * ID of item to delete, usually detected from context.
   */
  entityId: number;

  /**
   * Guid of item to delete, usually detected from context.
   */
  entityGuid: string;

  /**
   * Title of item to delete, usually detected from context.
   * This is important to show the "Are you sure?" dialog.
   */
  entityTitle: string;
}
