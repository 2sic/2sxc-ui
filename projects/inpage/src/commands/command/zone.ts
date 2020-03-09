import { CommandBase } from '../command-base';

/**
 * import this module to commands.ts
 */
export class Zone extends CommandBase {
  constructor() {
    super();
    this.makeDef('zone',
      'Zone',
      'manage',
      true,
      false,
      {
        showCondition: (context) => {
          return (context.user.canDesign);
        },
      });
  }
}

// ReSharper disable once UnusedLocals
const cmd = new Zone();
