import { CommandNames, Commands } from '..';

/**
 * import this module to commands.ts
 * @internal
 */
Commands.add(CommandNames.view, 'TemplateSettings', 'sliders', true, false, {
  dialog: (_) => 'edit',

  showCondition: (ctx) => !!ctx.user.CanDevelop && !ctx.app.isContent,

  configureLinkGenerator: (ctx, linkGen) => {
    linkGen.items = [{ EntityId: ctx.contentBlock.templateId }];
  },
});
