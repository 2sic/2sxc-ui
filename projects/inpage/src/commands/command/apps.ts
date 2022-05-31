import { Commands } from '..';

export const CmdApps = 'apps';
/**
 * import this module to commands.ts
 */
Commands.add(CmdApps, 'Zone', 'manage', true, false, {
    showCondition: (context) => {
        return !!context.user.CanAdmin;
    },
});
