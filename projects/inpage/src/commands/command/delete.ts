import { Commands } from '..';
import { contentItems } from '../../entity-manipulation/item-commands';

export const CmdDelete = 'delete';
/**
 * todo: work in progress related to https://github.com/2sic/2sxc/issues/618
 *
 * import this module to commands.ts
 */
Commands.add(CmdDelete, 'Delete', 'cancel', true, false, {
    // disabled: true,
    showCondition(context) {
        // can never be used for a modulelist item, as it is always in use somewhere
        if (context.button.action.params.useModuleList) {
            return false;
        }

        // check if all data exists required for deleting
        return (
            !!context.button.action.params.entityId &&
            !!context.button.action.params.entityGuid &&
            !!context.button.action.params.entityTitle
        );
    },
    code(context) {
        return contentItems.delete(
            context,
            context.button.action.params.entityId,
            context.button.action.params.entityGuid,
            context.button.action.params.entityTitle,
        );
    },
});
