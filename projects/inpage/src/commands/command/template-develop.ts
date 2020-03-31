import { Commands } from '..';

export const CmdTemplateDevelop = 'template-develop';

/**
 * import this module to commands.ts
 */
Commands.add(CmdTemplateDevelop, 'Develop', 'code', true, false, {
    newWindow: (_) => true,
    dialog: (_) => 'develop',

    showCondition: (context) => !!context.user.canDesign,

    configureLinkGenerator: (context, linkGenerator) => {
        linkGenerator.items = [{ EntityId: context.contentBlock.templateId }];
    },
});
