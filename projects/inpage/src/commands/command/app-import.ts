import { Commands } from '..';

/**
 * @internal
 */
export const CmdAppImport = 'app-import';
/**
 * open the import dialog
 *
 * import this module to commands.ts
 * @internal
 */
Commands.add(CmdAppImport, 'Dashboard', '', true, false, {});
