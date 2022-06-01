import { Command } from '../../commands/command';
import { CommandParams } from '../../commands/command-params';
import { Commands } from '../../commands/commands';
import { DictionaryValue } from '../../plumbing';

/**
 * @internal
 */
export class ButtonCommand {
    readonly command: Command; // reference to action to be run

    // customCode: string;

    constructor(public name: string, contentType?: string, public params?: CommandParams) {
        if (!params) this.params = {};
        if (contentType) this.params.contentType = contentType;
        this.command = Commands.singleton().get(name); // activate command for this
    }

    /** make static, as many ButtonCommand signatures are actually not objects */
    static mergeAdditionalParams(command: ButtonCommand, additionalParams: DictionaryValue): CommandParams {
        let params: CommandParams = {};
        if (command) {
            if (command.name) params.action = command.name;
            if (command.params) params = {...params, ...command.params, ...additionalParams};
        }
        command.params = params;
        return params;
    }
}
