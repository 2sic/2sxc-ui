import { Command, CommandNames, Commands } from '..';

const oldName = 'zone';
/**
 * import this module to commands.ts
 * @internal
 */
 const cmd = Command.build(CommandNames.system, 'Zone', 'manage', true, false, {
  dialog: (_) => oldName,
  showCondition: (context) => {
    return !!context.user.CanAdmin;
  },
});

Commands.addCommand(cmd);
Commands.addCommand(Command.clone(cmd, oldName));