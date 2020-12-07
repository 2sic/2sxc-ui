import { Commands } from '..';
import { SharedLogic } from './shared-logic';

export const CmdReplace = 'replace';
/**
 * import this module to commands.ts
 */
Commands.add(CmdReplace, 'Replace', 'replace', false, true, {

    showCondition(context) {
        return SharedLogic.isReferencedItem(context);
    },

    configureLinkGenerator: (context, linkGenerator) => {
        // default case is ContentBlock - in which case it doesn't need to redefine the items
        if (!SharedLogic.isFieldList(context)) return;

        // fieldList - redefine the items
        const params = context.button.command.params;
        linkGenerator.items = [{ Group: {
            Guid: params.parent,
            Part: params.fields,
            Index: params.sortOrder,
            Add: false,
        }}];
    },
});
