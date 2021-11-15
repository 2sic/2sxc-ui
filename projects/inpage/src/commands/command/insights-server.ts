﻿import { Commands } from '..';
import { $2sxcInPage } from '../../interfaces/sxc-controller-in-page';

export const CmdInsightsServer = 'insights-server';

/**
 * import this module to commands.ts
 */
Commands.add(CmdInsightsServer, 'Insights', 'speed', true, false, {
    showCondition: (context) => context.user.canDesign,
    code(context, event) {
        return new Promise((resolve, reject) => {
            console.log('context', context);
            const path = $2sxcInPage.http.apiUrl('sys/insights/logs');
            window.open(path, '_blank');
            return resolve();
        });
    },
});
