import { CommandNames, Commands } from '..';
import { SharedLogic } from './shared-logic';

/**
 * import this module to commands.ts
 * @internal
 */
Commands.add(CommandNames.replace, 'Replace', 'replace', false, true, {

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
