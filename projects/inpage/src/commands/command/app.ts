import { Commands } from '../commands';

/**
 * import this module to commands.ts
 */
Commands.add('app', 'App', 'settings', true, false, {
    showCondition: (context) => {
        return context.user.canDesign;
    },
});
