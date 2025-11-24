import { CommandDefinition, CommandNames, Commands } from '..';

/**
 * import this module to commands.ts
 * @internal
 */
const cmd = CommandDefinition.build(CommandNames.system, 'Zone', 'manage', true, false, {
  dialog: (_) => CommandNames.system_old_zone,
  
  showCondition: (ctx) => !!ctx.user.CanAdmin,

  noItems: true,
});

Commands.addCommand(cmd);
Commands.addCommand(CommandDefinition.clone(cmd, CommandNames.system_old_zone));
