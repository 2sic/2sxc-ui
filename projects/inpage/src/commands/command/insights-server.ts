import { Commands } from '..';
import { SxcApiUrlRoot } from '../../../../core';

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

    code(context, event) {
        return new Promise((resolve, reject) => {
            console.log('context', context);
            const path = `${context.instance.sxcRootUrl}${SxcApiUrlRoot}sys/insights/logs`;
            window.open(path, '_blank');
            return resolve();
        });
    },
});
