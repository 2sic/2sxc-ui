import { CommandBase } from '../command-base';

/**
 * import this module to commands.ts
 */
export class TemplateSettings extends CommandBase {
  constructor() {
    super();
    this.makeDef('template-settings',
      'TemplateSettings',
      'sliders',
      true,
      false,
      {
        dialog: (context) => 'edit',
        showCondition: (context) => {
          return (context.user.canDesign) && (!context.app.isContent);
        },
        configureCommand: (context, command) => {
          command.items = [{ EntityId: context.contentBlock.templateId }];
        },
      });
  }
}

// ReSharper disable once UnusedLocals
const cmd = new TemplateSettings();
