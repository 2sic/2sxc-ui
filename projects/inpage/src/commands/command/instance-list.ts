import { Commands, SharedLogic } from '..';

export const CmdInstanceList = 'instance-list';
/**
 * import this module to commands.ts
 */
Commands.add(CmdInstanceList, 'Sort', 'list-numbered', false, true, {
    showCondition: (context) => SharedLogic.isList(context),

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
