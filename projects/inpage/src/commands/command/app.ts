import { CommandBase } from '../command-base';

/**
 * import this module to commands.ts
 */
export class App extends CommandBase {
  constructor() {
    super();
    this.makeDef('app',
      'App',
      'settings',
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
const cmd = new App();
