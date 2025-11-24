import { CommandDefinition, CommandNames, Commands } from '..';

/**
 * import this module to commands.ts
 * @internal
 */
const cmd = CommandDefinition.build(CommandNames.view, 'TemplateSettings', 'sliders', true, false, {
  dialog: (_) => 'edit',

  showCondition: (ctx) => !!ctx.user.CanDevelop && !ctx.app.isContent,

  // configureLinkGenerator: (ctx, linkGen) => {
  //   linkGen.items = [{ EntityId: ctx.contentBlock.templateId }];
  // },

  customItems: (ctx, _) => {
    return [{ EntityId: ctx.contentBlock.templateId }];
  },

  // Special: the items are fake, they transport info about the template
  noItems: false,
});

Commands.addCommand(cmd);
Commands.addCommand(CommandDefinition.clone(cmd, CommandNames.view_old_templateSettings));
