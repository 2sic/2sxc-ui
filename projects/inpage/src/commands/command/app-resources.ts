import { CommandBase } from '../command-base';

/**
 * import this module to commands.ts
 */
export class AppResources extends CommandBase {
  constructor() {
    super();
    this.makeDef('app-resources',
      'AppResources',
      'translate',
      true,
      false,
      {
        dialog: (context) => 'edit',
        disabled: (context) => {
          return context.app.resourcesId === null;
        },
        title: (context) => `Toolbar.AppResources${context.app.resourcesId === null ? 'Disabled' : ''}`,
        showCondition: (context) => {
          return (context.user.canDesign) && (!context.app.isContent); // only if resources exist or are 0 (to be created)...
        },
        configureCommand: (context, command) => {
          command.items = [{ EntityId: context.app.resourcesId }];
        },
        dynamicClasses: (context) => {
          return context.app.resourcesId !== null ? '' : 'empty'; // if it doesn't have a query, make it less strong
        },
      });
  }
}

// ReSharper disable once UnusedLocals
const cmd = new AppResources();
