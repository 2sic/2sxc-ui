import { CommandDefinition } from '../../commands/command-definition';
import { Commands } from '../../commands/commands';

export class ButtonAction {
  readonly commandDefinition: CommandDefinition; // reference to action to be run
  customCode: string; // custom code if used

  constructor(public name: string,
              contentType?: string,
              public params?: any) {
    if (!params) {
      this.params = {};
    }

    if (contentType) {
      Object.assign(this.params, { contentType: contentType });
    }

    // activate command for this
    this.commandDefinition = Commands.get(name);

  }
}
