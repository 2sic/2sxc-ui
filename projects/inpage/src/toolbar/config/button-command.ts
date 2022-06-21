import { Command, CommandNames, CommandParams, Commands } from '../../commands';
import { TypeValue } from '../../plumbing';

/**
 * @internal
 */
export class ButtonCommand {
    readonly command: Command; // reference to action to be run

    // customCode: string;

    constructor(public name: CommandNames, contentType?: string, public params?: CommandParams) {
        if (!params) this.params = {};
        if (contentType) this.params.contentType = contentType;
        this.command = Commands.singleton().get(name); // activate command for this
    }

    /** make static, as many ButtonCommand signatures are actually not objects */
    static mergeAdditionalParams(command: ButtonCommand, additionalParams: Record<string, TypeValue>): CommandParams {
        let params: CommandParams = {};
        if (command) {
            if (command.name) params.action = command.name;
            if (command.params) params = {...params, ...command.params, ...additionalParams};
        }
        command.params = params;
        return params;
    }
}
