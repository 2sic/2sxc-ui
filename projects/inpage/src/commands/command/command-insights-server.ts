import { CommandNames, Commands } from '..';

/**
 * import this module to commands.ts
 * @internal
 */
Commands.add(CommandNames.insightsServer, 'Insights', 'speed', true, false, {
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
