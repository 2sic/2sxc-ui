import { Commands } from '../commands';

/**
 * import this module to commands.ts
 */
Commands.add('template-settings', 'TemplateSettings', 'sliders', true, false, {
    dialog: (context) => 'edit',
    showCondition: (context) => {
        return context.user.canDesign && !context.app.isContent;
    },
    configureCommand: (context, command) => {
        command.items = [{ EntityId: context.contentBlock.templateId }];
    },
});
