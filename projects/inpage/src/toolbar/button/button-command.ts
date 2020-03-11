import { CommandDefinition } from '../../commands/command-definition';
import { Commands } from '../../commands/commands';
import { CommandParams } from '../../commands/params';

export class ButtonCommand {
  readonly commandDefinition: CommandDefinition; // reference to action to be run
  customCode: string; // custom code if used

  constructor(public name: string,
              contentType?: string,
              public params?: Partial<CommandParams>) {
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
