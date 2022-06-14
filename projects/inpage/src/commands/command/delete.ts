import { Commands } from '..';
import { contentItems } from '../../entity-manipulation/item-commands';

/**
 * @internal
 */
export const CmdDelete = 'delete';
/**
 * import this module to commands.ts
 */
Commands.add(CmdDelete, 'Delete', 'cancel', true, false, {
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
