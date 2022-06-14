import { Commands } from '..';

/**
 * @internal
 */
export const CmdApps = 'apps';
/**
 * import this module to commands.ts
 * @internal
 */
Commands.add(CmdApps, 'Zone', 'manage', true, false, {
    showCondition: (context) => {
        return !!context.user.CanAdmin;
    },
});
