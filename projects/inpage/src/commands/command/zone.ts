import { Commands } from '..';

/**
 * @internal
 */
export const CmdZone = 'zone';
/**
 * import this module to commands.ts
 */
Commands.add(CmdZone, 'Zone', 'manage', true, false, {
    showCondition: (context) => {
        return !!context.user.CanAdmin;
    },
});
