import { Command, CommandNames, Commands } from '..';

const oldName = 'insights-server';

/**
 * import this module to commands.ts
 * @internal
 */
 const cmd = Command.build(CommandNames.insights, 'Insights', 'speed', true, false, {
  dialog: (_) => oldName,
  showCondition: (context) => context.user.CanDevelop,
  code(context, event) {
    return new Promise((resolve, reject) => {
      console.log('context', context);
      const path = window.$2sxc.http.apiUrl('sys/insights/logs');
      window.open(path, '_blank');
      return resolve();
    });
  },
});

Commands.addCommand(cmd);
Commands.addCommand(Command.clone(cmd, oldName));