import { CommandNames, Commands } from '..';

/**
 * import this module to commands.ts
 * @internal
 */
Commands.add(CommandNames.app, 'App', 'settings', true, false, {
  showCondition: (context) => {
    return context.user.CanAdmin;
  },
});
