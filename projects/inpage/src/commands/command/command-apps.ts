import { CommandNames, Commands } from '..';

/**
 * import this module to commands.ts
 * @internal
 */
Commands.add(CommandNames.apps, 'Zone', 'manage', true, false, {
  showCondition: (context) => !!context.user.CanAdmin,

  noItems: true,
});
