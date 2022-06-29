import { Command, CommandNames, Commands } from '..';

/**
 * import this module to commands.ts
 * @internal
 */
const cmd = Command.build(CommandNames.insights, 'Insights', 'speed', true, false, {
  dialog: (_) => CommandNames.insights_old_server,
  showCondition: (context) => context.user.CanDevelop,
  code(context, event) {
    return new Promise((resolve, reject) => {
      const path = window.$2sxc.http.apiUrl('sys/insights/logs');
      window.open(path, '_blank');
      return resolve();
    });
  },
});

Commands.addCommand(cmd);
Commands.addCommand(Command.clone(cmd, CommandNames.insights_old_server));
