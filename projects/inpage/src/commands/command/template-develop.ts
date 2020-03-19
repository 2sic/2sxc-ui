import { Commands } from '../commands';

/**
 * import this module to commands.ts
 */
Commands.add('template-develop', 'Develop', 'code', true, false, {
    newWindow: (context) => true,
    dialog: (context) => 'develop',

    showCondition: (context) => context.user.canDesign,

    configureCommand: (context, linkGenerator) => {
        linkGenerator.items = [{ EntityId: context.contentBlock.templateId }];
    },
});
