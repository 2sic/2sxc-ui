import { Commands } from '..';

export const CmdTemplateSettings = 'template-settings';
/**
 * import this module to commands.ts
 */
Commands.add(CmdTemplateSettings, 'TemplateSettings', 'sliders', true, false, {
    dialog: (context) => 'edit',

    showCondition: (context) => context.user.canDesign && !context.app.isContent,

    configureCommand: (context, linkGenerator) => {
        linkGenerator.items = [{ EntityId: context.contentBlock.templateId }];
    },
});
