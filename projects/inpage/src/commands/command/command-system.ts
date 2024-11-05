import { Command, CommandNames, Commands } from '..';

/**
 * import this module to commands.ts
 * @internal
 */
const cmd = Command.build(CommandNames.system, 'Zone', 'manage', true, false, {
  dialog: (_) => CommandNames.system_old_zone,
  
  showCondition: (ctx) => !!ctx.user.CanAdmin,

  noItems: true,
});

Commands.addCommand(cmd);
Commands.addCommand(Command.clone(cmd, CommandNames.system_old_zone));
