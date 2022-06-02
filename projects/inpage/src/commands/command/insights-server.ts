import { Commands } from '..';

/**
 * @internal
 */
export const CmdInsightsServer = 'insights-server';

/**
 * import this module to commands.ts
 */
Commands.add(CmdInsightsServer, 'Insights', 'speed', true, false, {
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
