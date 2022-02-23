import { Commands } from '..';

export const CmdTemplateSettings = 'template-settings';
/**
 * import this module to commands.ts
 */
Commands.add(CmdTemplateSettings, 'TemplateSettings', 'sliders', true, false, {
    dialog: (_) => 'edit',

    showCondition: (ctx) => !!ctx.user.CanDevelop && !ctx.app.isContent,

    configureLinkGenerator: (ctx, linkGen) => {
        linkGen.items = [{ EntityId: ctx.contentBlock.templateId }];
    },
});
