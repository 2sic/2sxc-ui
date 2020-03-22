import { Commands } from '..';

export const CmdTemplateDevelop = 'template-develop';

/**
 * import this module to commands.ts
 */
Commands.add(CmdTemplateDevelop, 'Develop', 'code', true, false, {
    newWindow: (context) => true,
    dialog: (context) => 'develop',

    showCondition: (context) => context.user.canDesign,

    configureCommand: (context, linkGenerator) => {
        linkGenerator.items = [{ EntityId: context.contentBlock.templateId }];
    },
});
