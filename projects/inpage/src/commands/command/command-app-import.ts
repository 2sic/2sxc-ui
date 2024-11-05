import { CommandNames, Commands } from '..';

/**
 * open the import dialog
 *
 * import this module to commands.ts
 * @internal
 */
Commands.add(CommandNames.appImport, 'Dashboard', '', true, false, {
  noItems: true,
});
