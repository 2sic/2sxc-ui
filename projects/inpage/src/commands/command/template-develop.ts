import { CommandBase } from '../command-base';

/**
 * import this module to commands.ts
 */
export class TemplateDevelop extends CommandBase {
  constructor() {
    super();
    this.makeDef('template-develop',
      'Develop',
      'code',
      true,
      false,
      {
        newWindow: (context) => true,
        dialog: (context) => 'develop',
        showCondition: (context) => {
          return (context.user.canDesign);
        },
        configureCommand: (context, command) => {
          command.items = [{ EntityId: context.contentBlock.templateId }];
        },
      });
  }
}

// ReSharper disable once UnusedLocals
const cmd = new TemplateDevelop();
