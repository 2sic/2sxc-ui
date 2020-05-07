import { Commands } from '..';
import { SharedLogic } from './shared-logic';

export const CmdReplace = 'replace';
/**
 * import this module to commands.ts
 */
Commands.add(CmdReplace, 'Replace', 'replace', false, true, {
    showCondition(context) {
        return !!context.button.command.params.useModuleList || SharedLogic.isFieldList(context);
    },

    configureLinkGenerator: (context, linkGenerator) => {
        if (!SharedLogic.isFieldList(context)) return;

        const params = context.button.command.params;
        linkGenerator.items = [{ Group: {
            Guid: params.parent,
            Part: params.fields,
            Index: params.sortOrder,
            Add: false,
        }}];
    },
});
