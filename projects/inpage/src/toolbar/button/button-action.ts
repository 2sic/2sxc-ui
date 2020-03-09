import { CommandDefinition } from '../../commands/command-definition';

export class ButtonAction {
  // name: string; // the command name from the action list
  // params: any[]; // custom parameters if used or if these override other params
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
