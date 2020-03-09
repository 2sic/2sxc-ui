import { CommandBase } from '../command-base';

/**
 * open the import dialog
 *
 * import this module to commands.ts
 */
export class AppImport extends CommandBase {
  constructor() {
    super();
    this.makeDef('app-import', 'Dashboard', '', true, false, {});
  }
}

// ReSharper disable once UnusedLocals
const cmd = new AppImport();
