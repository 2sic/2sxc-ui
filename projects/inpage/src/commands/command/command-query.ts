import { CommandDefinition, CommandNames, Commands, tlbI18nPrefix } from '..';

/**
 * import this module to commands.ts
 * @internal
 */
const cmd = CommandDefinition.build(CommandNames.query, 'QueryEdit', 'filter', true, false, {
  dialog: (_) => 'pipeline-designer',

  parameters: (ctx) => ({ pipelineId: ctx.contentBlock.queryId }),

  newWindow: (_) => true,

  disabled: (ctx) => ctx.app.settingsId === null || !ctx.contentBlock.queryId,

  title: (ctx) => `${tlbI18nPrefix}QueryEdit${ctx.contentBlock.queryId === null ? 'Disabled' : ''}`,

  showCondition: (ctx) => !!ctx.user.CanDevelop && !ctx.app.isContent,

  // if it doesn't have a query, make it less strong
  dynamicClasses: (ctx) => ctx.contentBlock.queryId ? '' : 'empty',

  noItems: true,
});


Commands.addCommand(cmd);
Commands.addCommand(CommandDefinition.clone(cmd, CommandNames.query_old_templateQuery));
