import { CommandNames, Commands } from '..';

/**
 * import this module to commands.ts
 * @internal
 */
Commands.add(CommandNames.zone, 'Zone', 'manage', true, false, {
  showCondition: (context) => {
    return !!context.user.CanAdmin;
  },
});
