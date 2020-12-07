import { Commands } from '..';
import { ItemIdentifierGroup } from '../../interfaces/item-identifiers';
import { SharedLogic } from './shared-logic';

export const CmdAddExisting = 'add-existing';
/**
 * import this module to commands.ts
 */
Commands.add(CmdAddExisting, 'AddExisting', 'add-existing', false, true, {
    dialog: (_) => 'replace',

    showCondition(context) {
        return SharedLogic.isList(context);
    },

    configureLinkGenerator: (context, linkGenerator) => {
        if (SharedLogic.isFieldList(context)) {
            const params = context.button.command.params;
            linkGenerator.items = [{ Group: {
                Guid: params.parent,
                Part: params.fields,
                Index: params.sortOrder + 1,
                Add: true,
            }}];
        } else if (SharedLogic.isPartOfBlockList(context)) {
            const topItem = linkGenerator.items[0] as ItemIdentifierGroup;
            topItem.Group.Add = true;
            topItem.Group.Index++;
            linkGenerator.items = [topItem];
        }
    },
});
