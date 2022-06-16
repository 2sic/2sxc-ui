import { Commands, CommandNames } from '..';

/**
 * import this module to commands.ts
 * @internal
 */
Commands.add(CommandNames.apps, 'Zone', 'manage', true, false, {
    showCondition: (context) => {
        return !!context.user.CanAdmin;
    },
});
