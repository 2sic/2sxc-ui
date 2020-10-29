import { Commands } from '..';
import { $2sxcInPage } from '../../interfaces/sxc-controller-in-page';

export const CmdInsightsServer = 'insights-server';

/**
 * new is a dialog to add something, and will not add if cancelled
 * new can also be used for mini-toolbars which just add an entity not attached to a module
 * in that case it's essential to add a contentType like
 * <ul class="sc-menu" data-toolbar='{"action":"new", "contentType": "Category"}'></ul>
 *
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
