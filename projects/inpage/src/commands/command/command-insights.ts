import { Command, CommandNames, Commands } from '..';

const InsightsApiRoot = 'sys/insights';

export function insightsUrl(part: string): string {
  return window.$2sxc.http.apiUrl(`${InsightsApiRoot}/${part}`);
}

/**
 * import this module to commands.ts
 * @internal
 */
const cmd = Command.build(CommandNames.insights, 'Insights', 'speed', true, false, {
  dialog: (_) => CommandNames.insights_old_server,
  showCondition: (context) => context.user.CanDevelop,
  code(context, event) {
    const path = insightsUrl(context.button.command.params?.part as string ?? 'logs');
    return new Promise((resolve) => {
      window.open(path, '_blank');
      return resolve();
    });
  },
});

Commands.addCommand(cmd);
Commands.addCommand(Command.clone(cmd, CommandNames.insights_old_server));
