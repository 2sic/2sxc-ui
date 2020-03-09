import { CommandBase } from '../command-base';

/**
 * import this module to commands.ts
 */
export class ContentType extends CommandBase {
  constructor() {
    super();
    this.makeDef('contenttype',
      'ContentType',
      'fields',
      true,
      false,
      {
        showCondition: (context) => {
          return context.user.canDesign;
        },
      });
  }
}

// ReSharper disable once UnusedLocals
const cmd = new ContentType();
