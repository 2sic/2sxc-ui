import { Commands } from '../commands';

/**
 * import this module to commands.ts
 */
Commands.add('zone', 'Zone', 'manage', true, false, {
    showCondition: (context) => {
        return context.user.canDesign;
    },
});
