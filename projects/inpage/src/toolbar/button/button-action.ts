import { CommandDefinition } from '../../commands/command-definition';

export class ButtonAction {
  commandDefinition: CommandDefinition; // reference to action to be run
  customCode: string; // custom code if used

  constructor(public name: string, contentType?: string, public params?: any) {
    if (!params) {
      this.params = {};
    }

    if (contentType) {
      Object.assign(this.params, { contentType: contentType });
    }

  }
}
