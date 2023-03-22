import { Command, CommandNames, Commands, tlbI18nPrefix } from '..';

/**
 * import this module to commands.ts
 * @internal
 */
const cmd = Command.build(CommandNames.query, 'QueryEdit', 'filter', true, false, {
  dialog: (_) => 'pipeline-designer',

  addParamsToLink: (ctx) => ({ pipelineId: ctx.contentBlock.queryId }),

  newWindow: (_) => true,

  disabled: (ctx) => ctx.app.settingsId === null || !ctx.contentBlock.queryId,

  title: (ctx) => `${tlbI18nPrefix}QueryEdit${ctx.contentBlock.queryId === null ? 'Disabled' : ''}`,

  showCondition: (ctx) => !!ctx.user.CanDevelop && !ctx.app.isContent,

  // if it doesn't have a query, make it less strong
  dynamicClasses: (ctx) => ctx.contentBlock.queryId ? '' : 'empty',
});


Commands.addCommand(cmd);
Commands.addCommand(Command.clone(cmd, CommandNames.query_old_templateQuery));
