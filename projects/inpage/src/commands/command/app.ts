import { Commands } from '..';

export const CmdApp = 'app';
/**
 * import this module to commands.ts
 */
Commands.add(CmdApp, 'App', 'settings', true, false, {
    showCondition: (context) => {
        return context.user.CanAdmin;
    },
});
