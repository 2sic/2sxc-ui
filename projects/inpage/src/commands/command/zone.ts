import { Commands } from '..';

export const CmdZone = 'zone';
/**
 * import this module to commands.ts
 */
Commands.add(CmdZone, 'Zone', 'manage', true, false, {
    addParamsToLink: (context) => {
        return {
            ...(context.button.command.params.dialogTab ? { dialogTab: context.button.command.params.dialogTab } : {}),
        };
    },
    showCondition: (context) => {
        return !!context.user.CanAdmin;
    },
});
