import { CommandBase } from '../command-base';

/**
 * import this module to commands.ts
 */
export class Layout extends CommandBase {
  constructor() {
    super();
    this.makeDef('layout',
      'ChangeLayout',
      'glasses',
      true,
      true,
      {
        inlineWindow: (context) => true,
      });
  }
}

// ReSharper disable once UnusedLocals
const cmd = new Layout();
