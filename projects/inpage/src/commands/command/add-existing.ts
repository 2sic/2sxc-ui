import { Commands } from '..';
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
        if (!SharedLogic.isFieldList(context)) return;

        const params = context.button.command.params;
        linkGenerator.items = [{ Group: {
            Guid: params.parent,
            Part: params.fields,
            Index: params.sortOrder,
            Add: true,
        }}];
    },
});
