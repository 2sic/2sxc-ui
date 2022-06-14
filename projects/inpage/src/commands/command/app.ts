import { Commands } from '..';

/**
 * @internal
 */
export const CmdApp = 'app';
/**
 * import this module to commands.ts
 * @internal
 */
Commands.add(CmdApp, 'App', 'settings', true, false, {
    showCondition: (context) => {
        return context.user.CanAdmin;
    },
});
