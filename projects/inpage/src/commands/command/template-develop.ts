import { Commands } from '../commands';

/**
 * import this module to commands.ts
 */
Commands.add('template-develop', 'Develop', 'code', true, false, {
    newWindow: (context) => true,
    dialog: (context) => 'develop',
    showCondition: (context) => {
        return context.user.canDesign;
    },
    configureCommand: (context, command) => {
        command.items = [{ EntityId: context.contentBlock.templateId }];
    },
});
