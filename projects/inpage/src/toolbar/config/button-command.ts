import { CommandDefinition, CommandNames, CommandParams, Commands } from '../../commands';
import { TypeValue } from '../../plumbing';

/**
 * @internal
 */
export class CommandWithParams {
    readonly commandDef: CommandDefinition; // reference to original definition which should run

    constructor(public name: CommandNames, public params?: CommandParams) {
        if (!params)
          this.params = {};
        this.commandDef = Commands.singleton().get(name); // activate command for this
    }

    /** make static, as many ButtonCommand signatures are actually not objects */
    static mergeAdditionalParams(command: CommandWithParams, additionalParams: Record<string, TypeValue>): CommandParams {
        let params: CommandParams = {};
        if (command) {
            if (command.name)
              params.action = command.name;
            if (command.params)
              params = {...params, ...command.params, ...additionalParams};
        }
        command.params = params;
        return params;
    }
}
