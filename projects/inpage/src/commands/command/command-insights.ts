import { Command, CommandNames, Commands } from '..';

/**
 * import this module to commands.ts
 * @internal
 */
const cmd = Command.build(CommandNames.insights, 'Insights', 'speed', true, false, {
  dialog: (_) => CommandNames.insights_old_server,
  showCondition: (context) => context.user.CanDevelop,
  code(context, event) {
    const insightsPart = context.button.command.params?.part as string;
    const path = insightsPart
      ? window.$2sxc.http.apiUrl('sys/insights/' + insightsPart)
      : window.$2sxc.http.apiUrl('sys/insights/logs');
    return new Promise((resolve) => {
      window.open(path, '_blank');
      return resolve();
    });
  },
});

Commands.addCommand(cmd);
Commands.addCommand(Command.clone(cmd, CommandNames.insights_old_server));
