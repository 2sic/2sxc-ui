import { Command } from '../../commands/command';
import { CommandParams } from '../../commands/command-params';
import { Commands } from '../../commands/commands';
import { DictionaryValue } from '../../plumbing';

export class ButtonCommand {
    readonly command: Command; // reference to action to be run

    customCode: string; // custom code if used

    constructor(public name: string, contentType?: string, public params?: CommandParams) {
        if (!params) this.params = {};
        if (contentType) this.params.contentType = contentType;
        this.command = Commands.get(name); // activate command for this
    }

    static prepareForUsingInLink(action: ButtonCommand, additionalParams: DictionaryValue): CommandParams {
        let params: CommandParams = {};
        if (action) {
            if (action.name) params.action = action.name;
            if (action.params) params = {...params, ...action.params, ...additionalParams};
        }
        return params;
    }
}
