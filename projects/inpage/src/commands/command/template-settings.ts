import { Commands } from '../commands';

/**
 * import this module to commands.ts
 */
Commands.add('template-settings', 'TemplateSettings', 'sliders', true, false, {
    dialog: (context) => 'edit',

    showCondition: (context) => context.user.canDesign && !context.app.isContent,

    configureCommand: (context, linkGenerator) => {
        linkGenerator.items = [{ EntityId: context.contentBlock.templateId }];
    },
});
