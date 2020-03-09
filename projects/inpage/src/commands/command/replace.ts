import { CommandBase } from '../command-base';

/**
 * import this module to commands.ts
 */
export class Replace extends CommandBase {
  constructor() {
    super();
    this.makeDef('replace',
      'Replace',
      'replace',
      false,
      true,
      {
        showCondition(context) {
          return (context.button.action.params.useModuleList);
        },
      });
  }
}

// ReSharper disable once UnusedLocals
const cmd = new Replace();
